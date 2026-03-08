import { describe, it, expect } from 'vitest'
import { calculate } from './index.js'

describe('Complexity', () => {
	it('should deduct points for a lot of Selectors more complex than most common Complexity', () => {
		const fixture = `
			${Array.from({ length: 1000 })
				.fill('')
				.map((_) => `selector { }`)
				.join('')}

			${Array.from({ length: 500 })
				.fill('')
				.map((_) => `:where(selector) { }`)
				.join('')}
		`
		const actual = calculate(fixture)

		expect(actual.complexity.violations).toEqual([
			{
				id: 'MoreThanMostCommonSelectorComplexity',
				score: 5,
				value: 1 / 3,
				actuals: Array.from({ length: 1000 })
					.fill(1)
					.concat(Array.from({ length: 500 }).fill(2)),
			},
		])
		expect(actual.complexity.score).toBe(95)
	})

	it('should deduct points for a lot of Selectors more complex than most common Specificity', () => {
		const fixture = `
			${Array.from({ length: 500 })
				.fill('')
				.map((_) => `selector1 { }`)
				.join('')}

			${Array.from({ length: 200 })
				.fill('')
				.map((_) => `.selector { }`)
				.join('')}
		`
		const actual = calculate(fixture)

		expect(actual.complexity.violations).toEqual([
			{
				id: 'MoreThanMostCommonSelectorSpecificity',
				score: 2,
				value: 200 / 700,
				actuals: Array.from({ length: 500 })
					.fill([0, 0, 1])
					.concat(Array.from({ length: 200 }).fill([0, 1, 0])),
			},
		])
		expect(actual.complexity.score).toBe(98)
	})

	it('deducts points for selectors with high complexity', () => {
		const fixture = `
			a b c d e f {}
		`
		const actual = calculate(fixture)

		expect(actual.complexity.violations).toEqual([
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
			},
		])
		expect(actual.complexity.score).toBe(87)
	})

	it('deducts points for having a high ratio of ID selectors', () => {
		const fixture = `
			a {}
			b {}
			c {}
			#a {}
		`
		const actual = calculate(fixture)

		expect(actual.complexity.violations).toEqual([
			{
				id: 'IdSelectorRatio',
				score: 2,
				value: 0.25,
				actuals: ['#a'],
			},
		])
		expect(actual.complexity.score).toBe(98)
	})

	it('deducts points for having a high ratio !importants', () => {
		const fixture = `
			selector {
				a: b;
				c: d;
				e: f;
				g: h !important;
			}
		`
		const actual = calculate(fixture)

		expect(actual.complexity.violations).toEqual([
			{
				id: 'ImportantRatio',
				score: 2,
				value: 0.25,
				actuals: 1,
			},
		])
		expect(actual.complexity.score).toBe(98)
	})
})
