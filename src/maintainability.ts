import { summarize_numbers } from '@projectwallace/css-analyzer'
import { items, type Analysis, type Guard } from './types.js'

export const guards: Guard[] = [
	// Source Lines of Code should be low
	(result: Analysis) => {
		const outcome = {
			id: 'SourceLinesOfCode',
			score: 0,
			value: result.stylesheet.source_lines_of_code,
		}

		if (result.stylesheet.source_lines_of_code > 10000) {
			// deduct 1 point per 1000 lines of code over 10,000
			const score = Math.floor((result.stylesheet.source_lines_of_code - 10000) / 1000)
			outcome.score = Math.min(15, score)
		}

		return outcome
	},

	// Average count of Selectors per RuleSet should be low
	(result: Analysis) => {
		const ALLOWED_SELECTORS_PER_RULESET = 2
		const actual = summarize_numbers(result.rules.selectors).mean

		const outcome = {
			id: 'AverageSelectorsPerRule',
			score: 0,
			value: actual,
			actuals: items(result.rules.selectors),
		}

		// Deduct 5 points per selector over 2
		if (actual > ALLOWED_SELECTORS_PER_RULESET) {
			const score = Math.floor((actual - ALLOWED_SELECTORS_PER_RULESET) * 5)
			outcome.score = Math.min(15, score)
		}

		return outcome
	},

	// Average count of Declarations per RuleSet should be low
	(result: Analysis) => {
		const ALLOWED_DECLARATIONS_PER_RULESET = 5

		const mean = summarize_numbers(result.rules.declarations).mean
		const outcome = {
			id: 'AverageDeclarationsPerRule',
			score: 0,
			value: mean,
			actuals: items(result.rules.declarations),
		}

		// Deduct 5 points per declaration over 5
		if (mean > ALLOWED_DECLARATIONS_PER_RULESET) {
			const score = Math.floor((mean - ALLOWED_DECLARATIONS_PER_RULESET) * 5)
			outcome.score = Math.min(15, score)
		}

		return outcome
	},

	// Max number of Selectors per Rule should be low
	(result: Analysis) => {
		const MAX_SELECTORS_PER_RULESET = 10
		const max = summarize_numbers(result.rules.selectors).max

		const outcome = {
			id: 'MaxSelectorsPerRule',
			score: 0,
			value: max,
			actuals: items(result.rules.selectors),
		}

		// Deduct 0.5 points per selectors over 10
		if (max > MAX_SELECTORS_PER_RULESET) {
			const score = Math.ceil((max - MAX_SELECTORS_PER_RULESET) * 0.5)
			outcome.score = Math.min(score, 15)
		}

		return outcome
	},

	// Max number of Declarations per Rule should be low
	(result: Analysis) => {
		const MAX_DECLARATIONS_PER_RULESET = 10
		const max = summarize_numbers(result.rules.declarations).max || 0

		const outcome = {
			id: 'MaxDeclarationsPerRule',
			score: 0,
			value: max,
			actuals: items(result.rules.declarations),
		}

		// Deduct 0.5 points per declarations over 10
		if (max > MAX_DECLARATIONS_PER_RULESET) {
			const score = Math.ceil((max - MAX_DECLARATIONS_PER_RULESET) * 0.5)
			outcome.score = Math.min(15, score)
		}

		return outcome
	},

	// Number of Selectors per RuleSet should not differ too much from the most common amount of
	// Selectors per RuleSet
	(result: Analysis) => {
		const mode = summarize_numbers(result.rules.selectors).mode
		const rulesHavingMoreThanMode = items(result.rules.selectors).filter(
			(item) => item > mode,
		).length

		const outcome = {
			id: 'MoreThanMostCommonSelectorsPerRule',
			score: 0,
			value: mode,
			actuals: items(result.rules.selectors),
		}

		// if more than 10% of RuleSets has more Selectors than most common:
		if (rulesHavingMoreThanMode > result.rules.total * 0.1) {
			// then deduct 0.01 for ever applicable RuleSet
			const score = Math.floor(rulesHavingMoreThanMode * 0.01)
			// with a maximum of 10 points
			outcome.score = Math.min(15, score)
		}

		return outcome
	},

	// Number of Declarations per RuleSet should not differ too much from the most common amount of
	// Declarations per RuleSet
	(result: Analysis) => {
		const mode = summarize_numbers(result.rules.selectors).mode
		const rulesHavingMoreThanMode = items(result.rules.declarations).filter(
			(item) => item > mode,
		).length

		const outcome = {
			id: 'MoreThanMostCommonDeclarationsPerRule',
			score: 0,
			value: summarize_numbers(result.rules.declarations).mode,
			actuals: items(result.rules.declarations),
		}

		// if more than 10% of RuleSets has more Declarations than most common:
		if (rulesHavingMoreThanMode > result.rules.total * 0.1) {
			// then deduct 0.01 for ever applicable RuleSet
			const score = Math.floor(rulesHavingMoreThanMode * 0.01)
			// with a maximum of 10 points
			outcome.score = Math.min(15, score)
		}

		return outcome
	},
]
