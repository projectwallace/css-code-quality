import * as assert from 'uvu/assert'
import { suite } from 'uvu'
import { calculate } from './index.js'

const Complexity = suite('Complexity')

Complexity('should deduct points for a lot of Selectors more complex than most common Complexity', () => {
  const fixture = `
    ${new Array(1000)
      .fill('')
      .map(_ => `selector { }`)
      .join('')
    }

    ${new Array(500)
      .fill('')
      .map(_ => `:where(selector) { }`)
      .join('')
    }
  `
  const actual = calculate(fixture)

  assert.equal(actual.complexity.violations, [
    {
      id: 'MoreThanMostCommonSelectorComplexity',
      score: 5,
      value: 1 / 3,
      actuals: (new Array(1000).fill(1)).concat(new Array(500).fill(2)),
    }
  ])
  assert.is(actual.complexity.score, 95)
})

Complexity('should deduct points for a lot of Selectors more complex than most common Specificity', () => {
  const fixture = `
    ${new Array(500)
      .fill('')
      .map(_ => `selector1 { }`)
      .join('')
    }

    ${new Array(200)
      .fill('')
      .map(_ => `.selector { }`)
      .join('')
    }
  `
  const actual = calculate(fixture)

  assert.equal(actual.complexity.violations, [
    {
      id: 'MoreThanMostCommonSelectorSpecificity',
      score: 2,
      value: 200 / 700,
      actuals: (new Array(500).fill([0, 0, 1])).concat(new Array(200).fill([0, 1, 0])),
    }
  ])
  assert.is(actual.complexity.score, 98)
})

Complexity('deducts points for selectors with high complexity', () => {
  const fixture = `
    a b c d e f {}
  `
  const actual = calculate(fixture)

  assert.equal(actual.complexity.violations, [
    {
      id: 'MaxSelectorComplexity',
      score: 3,
      value: 11,
      actuals: [11],
    },
    {
      id: 'AverageSelectorComplexity',
      score: 10,
      value: 11,
      actuals: [11],
    }
  ])
  assert.is(actual.complexity.score, 87)
})

Complexity('deducts points for having a high ratio of ID selectors', () => {
  const fixture = `
    a {}
    b {}
    c {}
    #a {}
  `
  const actual = calculate(fixture)

  assert.equal(actual.complexity.violations, [
    {
      id: 'IdSelectorRatio',
      score: 2,
      value: 0.25,
      actuals: ['#a'],
    }
  ])
  assert.is(actual.complexity.score, 98)
})

Complexity('deducts points for having a high ratio !importants', () => {
  const fixture = `
    selector {
      a: b;
      c: d;
      e: f;
      g: h !important;
    }
  `
  const actual = calculate(fixture)

  assert.equal(actual.complexity.violations, [
    {
      id: 'ImportantRatio',
      score: 2,
      value: 0.25,
      actuals: 1,
    }
  ])
  assert.is(actual.complexity.score, 98)
})

Complexity.run()