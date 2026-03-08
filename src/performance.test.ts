import { describe, it, expect } from 'vitest'
import { calculate } from './index.js'

describe('Performance', () => {
	it('does not deduct points for not having @import', () => {
		const actual = calculate(`
			test { color: green; }
		`)
		expect(actual.performance.score).toBe(100)
		expect(actual.performance.violations.length).toBe(0)
	})

	it('deducts points for having a single @import', () => {
		const actual = calculate(`
			@import url('some-url');
			test { color: green; }
		`)
		expect(actual.performance.score).toBe(90)
		expect(actual.performance.violations).toEqual([
			{
				id: 'Imports',
				value: 1,
				score: 10,
				actuals: [`url('some-url')`],
			},
		])
	})

	it('deducts points for having multiple @imports', () => {
		const actual = calculate(`
			@import url('some-url');
			@import url('another-url');
			test { color: green; }
		`)
		expect(actual.performance.score).toBe(80)
		expect(actual.performance.violations).toEqual([
			{
				id: 'Imports',
				value: 2,
				score: 20,
				actuals: [`url('some-url')`, `url('another-url')`],
			},
		])
	})

	it('does not deduct points for not having empty rules', () => {
		const actual = calculate(`test { color: green; }`)
		expect(actual.performance.score).toBe(100)
		expect(actual.performance.violations.length).toBe(0)
	})

	it('deducts points for having a single empty rule', () => {
		const actual = calculate(`
			test-empty {}
			test { color: green; }
		`)
		expect(actual.performance.score).toBe(99)
		expect(actual.performance.violations).toEqual([
			{
				id: 'EmptyRules',
				score: 1,
				value: 1,
			},
		])
	})

	it('deducts points for having multiple empty rules', () => {
		const actual = calculate(`
			test-empty1 {}
			test-empty2 {}
			test { color: green; }
		`)
		expect(actual.performance.score).toBe(98)
		expect(actual.performance.violations).toEqual([
			{
				id: 'EmptyRules',
				score: 2,
				value: 2,
			},
		])
	})

	it('does not deduct points for having unique selectors', () => {
		const actual = calculate(`
			test1 { color: green; }
			test2 { color: red; }
		`)
		expect(actual.performance.score).toBe(100)
	})

	it('deducts points for having low selector uniqueness', () => {
		const actual = calculate(`
			test1 { color: green; }
			test1 { color: red; }
			test2 { color: magenta; }
			test2 { color: blue; }
		`)
		expect(actual.performance.score).toBe(95)
		expect(actual.performance.violations).toEqual([
			{
				id: 'SelectorDuplications',
				score: 5,
				value: 2 / 4,
			},
		])
	})

	it('does not deduct points for having unique declarations', () => {
		const actual = calculate(`
			test1 { color: green; }
			test2 { color: red; }
		`)
		expect(actual.performance.score).toBe(100)
	})

	it('deducts points for having low declaration uniqueness', () => {
		const actual = calculate(`
			test1 { color: green; }
			test2 { color: green; }
			test3 { color: red; }
			test4 { color: red; }
		`)
		expect(actual.performance.score).toBe(95)
		expect(actual.performance.violations).toEqual([
			{
				id: 'DeclarationDuplications',
				score: 5,
				value: 2 / 4,
			},
		])
	})

	it('does not deduct points for small stylesheets', () => {
		const actual = calculate(`
			test { color: green; }
		`)
		expect(actual.performance.score).toBe(100)
	})

	it('deducts points for large stylesheets', () => {
		const fixture = Array.from({ length: 10_000 })
			.fill('')
			.map((_, index) => `selector-${index} { opacity: 0.${index}}`)
			.join('')
		const actual = calculate(fixture)

		expect(actual.performance.score).toBe(95)
	})

	it('deducts points for having comments', () => {
		const fixture = Array.from({ length: 100 })
			.fill('/* a comment to take up some space */')
			.map((comment, index) => `${comment} selector-${index} { opacity: 0.${index} }`)
			.join('')
		const actual = calculate(fixture)

		expect(actual.performance.score).toBe(90)
		expect(actual.performance.violations).toEqual([
			{
				id: 'TooMuchComments',
				score: 10,
				value: 3700,
			},
		])
	})

	it('deducts points for having embedded content', () => {
		function generateEmbed(index: number) {
			return `data:image/svg+xml,%3Csvg%20id%3D%22Layer_${index}%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20195.6%20107.8%22%3E%3Cpath%20fill%3D%22%23B5B5B5%22%20class%3D%22st0%22%20d%3D%22M97.8%20107.8c-2.6%200-5.1-1-7.1-2.9L2.9%2017.1C-1%2013.2-1%206.8%202.9%202.9%206.8-1%2013.2-1%2017.1%202.9l80.7%2080.7%2080.7-80.7c3.9-3.9%2010.2-3.9%2014.1%200%203.9%203.9%203.9%2010.2%200%2014.1l-87.8%2087.8c-1.9%202-4.4%203-7%203z%22%2F%3E%3C%2Fsvg%3E`
		}
		const fixture = Array.from({ length: 100 })
			.fill('')
			.map((_, index) => `
				selector-${index} {
					background: url(${generateEmbed(index)});
				}
			`)
			.join('')
		const actual = calculate(fixture)

		expect(actual.performance.score).toBe(80)
		expect(actual.performance.violations).toEqual([
			{
				id: 'TooMuchEmbeddedContent',
				score: 20,
				value: 45990,
			},
		])
	})
})
