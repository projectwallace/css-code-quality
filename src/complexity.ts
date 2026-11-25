import { summarize_numbers } from '@projectwallace/css-analyzer'
import { summarize_specificity } from '@projectwallace/css-analyzer/collectors'
import { compare_specificity, type Specificity } from '@projectwallace/css-analyzer/selectors'
import { items, type Analysis, type Guard } from './types.js'

const parse_specificity = (s: string) => s.split(',').map(Number) as Specificity

export const guards: Guard[] = [
	// Complexity per Selector should not differ too much from the most common Complexity
	(result: Analysis) => {
		const complexities = items(result.selectors.complexity)
		const mode = summarize_numbers(result.selectors.complexity).mode
		const selectorsAboveMode = complexities.filter((c) => c > mode).length

		const outcome = {
			id: 'MoreThanMostCommonSelectorComplexity',
			score: 0,
			value: result.selectors.total === 0 ? 0 : selectorsAboveMode / result.selectors.total,
			actuals: complexities,
		}

		if (selectorsAboveMode > result.selectors.total * 0.1) {
			const score = Math.floor(selectorsAboveMode * 0.01)
			outcome.score = Math.min(10, score)
		}

		return outcome
	},

	// Specificity per Selector should not differ too much from the most common Specificity
	(result: Analysis) => {
		const mode = summarize_specificity(result.specificity).mode
		const all = items(result.specificity).map((s) => parse_specificity(s))
		const selectorsAboveMode = all.filter((c) => compare_specificity(c, mode) > 0).length

		const outcome = {
			id: 'MoreThanMostCommonSelectorSpecificity',
			score: 0,
			value: result.selectors.total === 0 ? 0 : selectorsAboveMode / result.selectors.total,
			actuals: all,
		}

		if (selectorsAboveMode > result.selectors.total * 0.1) {
			const score = Math.floor(selectorsAboveMode * 0.01)
			outcome.score = Math.min(10, score)
		}

		return outcome
	},

	// Maximum Selector Complexity should be low
	(result: Analysis) => {
		const MAX_SELECTOR_COMPLEXITY = 5
		const { max: actual } = summarize_numbers(result.selectors.complexity)

		const outcome = {
			id: 'MaxSelectorComplexity',
			score: 0,
			value: actual,
			actuals: items(result.selectors.complexity),
		}

		// Deduct 0.5 points per complexity over 5, up to 5 points
		if (actual > MAX_SELECTOR_COMPLEXITY) {
			const score = Math.ceil((actual - MAX_SELECTOR_COMPLEXITY) * 0.5)
			outcome.score = Math.min(5, score)
		}

		return outcome
	},

	// Average Selector Complexity should be low
	(result: Analysis) => {
		const ALLOWED_COMPLEXITY = 2
		const actual = summarize_numbers(result.selectors.complexity).mean

		const outcome = {
			id: 'AverageSelectorComplexity',
			score: 0,
			value: actual,
			actuals: items(result.selectors.complexity),
		}

		// Deduct 2 points per selector over 2
		if (actual > ALLOWED_COMPLEXITY) {
			const score = Math.ceil((actual - ALLOWED_COMPLEXITY) * 2)
			outcome.score = Math.min(10, score)
		}

		return outcome
	},

	(result: Analysis) => {
		const ALLOWED = 0.01
		const actual =
			result.selectors.total === 0 ? 0 : result.selectors.ids.total / result.selectors.total
		const outcome = {
			id: 'IdSelectorRatio',
			score: 0,
			value: actual,
			actuals: [...result.selectors.ids.unique.keys()],
		}

		if (actual > ALLOWED) {
			const score = Math.floor((actual - ALLOWED) * 10)
			outcome.score = Math.min(score, 5)
		}

		return outcome
	},

	(result: Analysis) => {
		const ALLOWED = 0.01
		const actual =
			result.declarations.total === 0
				? 0
				: result.declarations.importants.total / result.declarations.total
		const outcome = {
			id: 'ImportantRatio',
			score: 0,
			value: actual,
			actuals: result.declarations.importants.total,
		}

		if (actual > ALLOWED) {
			const score = Math.floor((actual - ALLOWED) * 10)
			outcome.score = Math.min(score, 5)
		}

		return outcome
	},
]
