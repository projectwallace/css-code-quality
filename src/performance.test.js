import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import { calculate } from './index.js'

const Performance = suite('Performance')

Performance('does not deduct points for not having @import', () => {
  const actual = calculate(`
    test { color: green; }
  `)
  assert.is(actual.performance.score, 100)
  assert.is(actual.performance.violations.length, 0)
})

Performance('deducts points for having a single @import', () => {
  const actual = calculate(`
    @import url('some-url');
    test { color: green; }
  `)
  assert.is(actual.performance.score, 90)
  assert.equal(actual.performance.violations, [
    {
      id: 'Imports',
      value: 1,
      score: 10,
    },
  ])
})

Performance('deducts points for having multiple @imports', () => {
  const actual = calculate(`
    @import url('some-url');
    @import url('another-url');
    test { color: green; }
  `)
  assert.is(actual.performance.score, 80)
  assert.equal(actual.performance.violations, [
    {
      id: 'Imports',
      value: 2,
      score: 20,
    },
  ])
})

Performance('does not deduct points for not having empty rules', () => {
  const actual = calculate(`test { color: green; }`)
  assert.is(actual.performance.score, 100)
  assert.is(actual.performance.violations.length, 0)
})

Performance('deducts points for having a single empty rule', () => {
  const actual = calculate(`
    test-empty {}
    test { color: green; }
  `)
  assert.is(actual.performance.score, 99)
})

Performance('deducts points for having multiple empty rules', () => {
  const actual = calculate(`
    test-empty1 {}
    test-empty2 {}
    test { color: green; }
  `)
  assert.is(actual.performance.score, 98)
  assert.equal(actual.performance.violations, [
    {
      id: 'EmptyRules',
      score: 2,
      value: 2,
    },
  ])
})

Performance('does not deduct points for having unique selectors', () => {
  const actual = calculate(`
    test1 { color: green; }
    test2 { color: red; }
  `)
  assert.is(actual.performance.score, 100)
})

Performance('deducts points for having low selector uniqueness', () => {
  const actual = calculate(`
    test1 { color: green; }
    test1 { color: red; }
    test2 { color: magenta; }
    test2 { color: blue; }
  `)
  assert.is(actual.performance.score, 95)
  assert.equal(actual.performance.violations, [
    {
      id: 'SelectorDuplications',
      score: 5,
      value: 2 / 4
    },
  ])
})

Performance('does not deduct points for having unique declarations', () => {
  const actual = calculate(`
    test1 { color: green; }
    test2 { color: red; }
  `)
  assert.is(actual.performance.score, 100)
})

Performance('deducts points for having low declaration uniqueness', () => {
  const actual = calculate(`
    test1 { color: green; }
    test2 { color: green; }
    test3 { color: red; }
    test4 { color: red; }
  `)
  assert.is(actual.performance.score, 95)
  assert.equal(actual.performance.violations, [
    {
      id: 'DeclarationDuplications',
      score: 5,
      value: 2 / 4
    }
  ])
})

Performance('does not deduct points for small stylesheets', () => {
  const actual = calculate(`
    test { color: green; }
  `);
  assert.is(actual.performance.score, 100)
})

Performance('deducts points for large stylesheets', () => {
  const fixture = new Array(10_000)
    .fill('')
    .map((_, index) => `selector-${index} { opacity: 0.${index}}`)
    .join('')
  const actual = calculate(fixture)

  assert.is(actual.performance.score, 95)
})

Performance('deducts points for having comments', () => {
  const fixture = new Array(100)
    .fill('/* a comment to take up some space */')
    .map((comment, index) => `${comment} selector-${index} { opacity: 0.${index} }`)
    .join('')
  const actual = calculate(fixture)

  assert.is(actual.performance.score, 90)
  assert.equal(actual.performance.violations, [
    {
      id: 'TooMuchComments',
      score: 10,
      value: 3300,
    },
  ])
})

Performance('deducts points for having embedded content', () => {
  const fixture = new Array(100)
    .fill('')
    .map((_, index) => `
      selector-${index} {
        background: url(data:image/svg+xml,%3Csvg%20id%3D%22Layer_${index}%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20195.6%20107.8%22%3E%3Cpath%20fill%3D%22%23B5B5B5%22%20class%3D%22st0%22%20d%3D%22M97.8%20107.8c-2.6%200-5.1-1-7.1-2.9L2.9%2017.1C-1%2013.2-1%206.8%202.9%202.9%206.8-1%2013.2-1%2017.1%202.9l80.7%2080.7%2080.7-80.7c3.9-3.9%2010.2-3.9%2014.1%200%203.9%203.9%203.9%2010.2%200%2014.1l-87.8%2087.8c-1.9%202-4.4%203-7%203z%22%2F%3E%3C%2Fsvg%3E);
      }
    `)
    .join('')
  const actual = calculate(fixture)

  assert.is(actual.performance.score, 80)
  assert.equal(actual.performance.violations, [
    {
      id: 'TooMuchEmbeddedContent',
      score: 20,
      value: 45990,
    },
  ])
})

Performance.run()