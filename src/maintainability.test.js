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

Maintainability('deducts no points for have few Selectors per RuleSet', () => {
  const actual = calculate(`
    test1 {}

    test2,
    test3 {}
  `)

  assert.is(actual.maintainability.score, 100)
  assert.is(actual.maintainability.violations.length, 0)
})

Maintainability('deducts points for having too many Selectors per RuleSet', () => {
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
      actuals: [4, 5],
    }
  ])
})

Maintainability('deducts points for having too many Selectors in a RuleSet', () => {
  const actual = calculate(`
    test1,
    test2,
    test3,
    test4,
    test5,
    test6,
    test7,
    test8,
    test9,
    test10,
    test11,
    test12,
    test13,
    test14,
    test15 {}

    testA {}
  `)

  assert.is(actual.maintainability.score, 82)
  assert.equal(actual.maintainability.violations, [
    {
      id: 'AverageSelectorsPerRule',
      score: 15,
      value: 8,
      actuals: [15, 1],
    },
    {
      id: 'MaxSelectorsPerRule',
      score: 3,
      value: 15,
      actuals: [15, 1],
    },
  ])
})

Maintainability('deducts points for having too many Declarations in a single RuleSet', () => {
  const fixture = `
    selector1 {
      color: tomato;
    }

    selector2 {
      ${new Array(23)
      .fill('')
      .map(i => `z-index: ${i};`)
      .join('')
    }}
  `
  const actual = calculate(fixture)

  assert.is(actual.maintainability.score, 78)
  assert.equal(actual.maintainability.violations, [
    {
      id: "AverageDeclarationsPerRule",
      score: 15,
      value: 12,
      actuals: [1, 23],
    },
    {
      id: 'MaxDeclarationsPerRule',
      score: 7, // Math.ceil((23 - 10) * 0.5) === Math.ceil(6.5)
      value: 23,
      actuals: [1, 23],
    },
  ])
})

Maintainability('deducts points for having RuleSets with more Selectors than what is most common', () => {
  const fixture = `
    ${new Array(1000)
      .fill('')
      .map(index => `selector-${index} {}`)
      .join('')
    }

    ${new Array(500)
      .fill('')
      .map(index => `selector-${index}a, selector-${index}-b {}`)
      .join('')
    }
  `
  const actual = calculate(fixture)

  assert.equal(actual.maintainability.violations, [
    {
      id: 'MoreThanMostCommonSelectorsPerRule',
      score: 5,
      value: 1,
      actuals: (new Array(1000).fill(1)).concat(new Array(500).fill(2)),
    },
  ])
  assert.is(actual.maintainability.score, 95)
})

Maintainability('deducts points for having RuleSets with more Selectors than what is most common', () => {
  const fixture = `
    ${new Array(1000)
      .fill('')
      .map(index => `selector-${index}a { z-index: ${index}; }`)
      .join('')
    }

    ${new Array(500)
      .fill('')
      .map(index => `selector-${index}b { z-index: ${index}; content: "${index}" }`)
      .join('')
    }
  `
  const actual = calculate(fixture)

  assert.equal(actual.maintainability.violations, [
    {
      id: 'MoreThanMostCommonDeclarationsPerRule',
      score: 5,
      value: 1,
      actuals: (new Array(1000).fill(1)).concat(new Array(500).fill(2)),
    },
  ])
  assert.is(actual.maintainability.score, 95)
})

Maintainability.run()