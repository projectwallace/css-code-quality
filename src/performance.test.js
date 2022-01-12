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
      value: [`url('some-url')`],
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
      value: [
        `url('some-url')`,
        `url('another-url')`,
      ],
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

Performance.run()