import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import { calculate } from './index.js'

const Maintainability = suite('Maintainability')

Maintainability('does not deduct points for 1 SLoC', () => {
  const actual = calculate(`test {}`)
  assert.is(actual.maintainability.score, 100)
  assert.is(actual.maintainability.violations.length, 0)
})

Maintainability('deducts points for having lots of SLoC', () => {
  const fixture = new Array(10_000)
    .fill('')
    .map((_, index) => `selector-${index} { opacity: 0.${index}}`)
    .join('')
  const actual = calculate(fixture)

  assert.is(actual.maintainability.score, 90)
  assert.equal(actual.maintainability.violations, [
    {
      id: 'SourceLinesOfCode',
      score: 10,
      value: 20_000,
    }
  ])
})

Maintainability('deducts no points for have few selectors per rule', () => {
  const actual = calculate(`
    test1 {}

    test2,
    test3 {}
  `)

  assert.is(actual.maintainability.score, 100)
  assert.is(actual.maintainability.violations.length, 0)
})

Maintainability('deducts points for having too many selectors per rule', () => {
  const actual = calculate(`
    test1,
    test2,
    test3,
    test3b {}

    test4,
    test5,
    test6,
    test7,
    test8 {}
  `)

  assert.is(actual.maintainability.score, 88)
  assert.equal(actual.maintainability.violations, [
    {
      id: 'AverageSelectorsPerRule',
      score: 12,
      value: 4.5,
    }
  ])
})

Maintainability.run()