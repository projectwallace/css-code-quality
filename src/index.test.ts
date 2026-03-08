import { describe, it, expect } from 'vitest'
import { calculate } from './index.js'

describe('Index', () => {
	it('exposes a calculate function', () => {
		expect(typeof calculate).toBe('function')
	})

	it('smoke test', () => {
		const css = `
			@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

			.my_test,
			.my_extra_test {
				color: red;
			}

			#my_test {
				color: green;
			}
		`
		const result = calculate(css)
		expect(result).toEqual({
			violations: [
				{
					id: 'Imports',
					score: 10,
					value: 1,
					actuals: [
						"url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap')",
					],
				},
				{
					id: 'IdSelectorRatio',
					score: 3,
					value: 0.3333333333333333,
					actuals: ['#my_test'],
				},
			],
			passes: [
				{
					id: 'EmptyRules',
					score: 0,
					value: 0,
				},
				{
					id: 'SelectorDuplications',
					score: 0,
					value: 0,
				},
				{
					id: 'DeclarationDuplications',
					score: 0,
					value: 0,
				},
				{
					id: 'CssSize',
					score: 0,
					value: 189,
				},
				{
					id: 'TooMuchComments',
					score: 0,
					value: 0,
				},
				{
					id: 'TooMuchEmbeddedContent',
					score: 0,
					value: 0,
				},
				{
					id: 'SourceLinesOfCode',
					score: 0,
					value: 6,
				},
				{
					id: 'AverageSelectorsPerRule',
					score: 0,
					value: 1.5,
					actuals: [2, 1],
				},
				{
					id: 'AverageDeclarationsPerRule',
					score: 0,
					value: 1,
					actuals: [1, 1],
				},
				{
					id: 'MaxSelectorsPerRule',
					score: 0,
					value: 2,
					actuals: [2, 1],
				},
				{
					id: 'MaxDeclarationsPerRule',
					score: 0,
					value: 1,
					actuals: [1, 1],
				},
				{
					id: 'MoreThanMostCommonSelectorsPerRule',
					score: 0,
					value: 1.5,
					actuals: [2, 1],
				},
				{
					id: 'MoreThanMostCommonDeclarationsPerRule',
					score: 0,
					value: 1,
					actuals: [1, 1],
				},
				{
					id: 'MoreThanMostCommonSelectorComplexity',
					score: 0,
					value: 0,
					actuals: [1, 1, 1],
				},
				{
					id: 'MoreThanMostCommonSelectorSpecificity',
					score: 0,
					value: 0.3333333333333333,
					actuals: [
						[0, 1, 0],
						[0, 1, 0],
						[1, 0, 0],
					],
				},
				{
					id: 'MaxSelectorComplexity',
					score: 0,
					value: 1,
					actuals: [1, 1, 1],
				},
				{
					id: 'AverageSelectorComplexity',
					score: 0,
					value: 1,
					actuals: [1, 1, 1],
				},
				{
					id: 'ImportantRatio',
					score: 0,
					value: 0,
					actuals: 0,
				},
			],
			performance: {
				score: 90,
				violations: [
					{
						id: 'Imports',
						score: 10,
						value: 1,
						actuals: [
							"url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap')",
						],
					},
				],
				passes: [
					{
						id: 'EmptyRules',
						score: 0,
						value: 0,
					},
					{
						id: 'SelectorDuplications',
						score: 0,
						value: 0,
					},
					{
						id: 'DeclarationDuplications',
						score: 0,
						value: 0,
					},
					{
						id: 'CssSize',
						score: 0,
						value: 189,
					},
					{
						id: 'TooMuchComments',
						score: 0,
						value: 0,
					},
					{
						id: 'TooMuchEmbeddedContent',
						score: 0,
						value: 0,
					},
				],
			},
			maintainability: {
				score: 100,
				violations: [],
				passes: [
					{
						id: 'SourceLinesOfCode',
						score: 0,
						value: 6,
					},
					{
						id: 'AverageSelectorsPerRule',
						score: 0,
						value: 1.5,
						actuals: [2, 1],
					},
					{
						id: 'AverageDeclarationsPerRule',
						score: 0,
						value: 1,
						actuals: [1, 1],
					},
					{
						id: 'MaxSelectorsPerRule',
						score: 0,
						value: 2,
						actuals: [2, 1],
					},
					{
						id: 'MaxDeclarationsPerRule',
						score: 0,
						value: 1,
						actuals: [1, 1],
					},
					{
						id: 'MoreThanMostCommonSelectorsPerRule',
						score: 0,
						value: 1.5,
						actuals: [2, 1],
					},
					{
						id: 'MoreThanMostCommonDeclarationsPerRule',
						score: 0,
						value: 1,
						actuals: [1, 1],
					},
				],
			},
			complexity: {
				score: 97,
				violations: [
					{
						id: 'IdSelectorRatio',
						score: 3,
						value: 0.3333333333333333,
						actuals: ['#my_test'],
					},
				],
				passes: [
					{
						id: 'MoreThanMostCommonSelectorComplexity',
						score: 0,
						value: 0,
						actuals: [1, 1, 1],
					},
					{
						id: 'MoreThanMostCommonSelectorSpecificity',
						score: 0,
						value: 0.3333333333333333,
						actuals: [
							[0, 1, 0],
							[0, 1, 0],
							[1, 0, 0],
						],
					},
					{
						id: 'MaxSelectorComplexity',
						score: 0,
						value: 1,
						actuals: [1, 1, 1],
					},
					{
						id: 'AverageSelectorComplexity',
						score: 0,
						value: 1,
						actuals: [1, 1, 1],
					},
					{
						id: 'ImportantRatio',
						score: 0,
						value: 0,
						actuals: 0,
					},
				],
			},
		})
	})
})
