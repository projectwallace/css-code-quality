import type { Analysis, Guard } from './types.js'

export const guards: Guard[] = [

	// Should not contain @import rules
	(result: Analysis) => ({
		id: 'Imports',
		score: result.atrules.import.total * 10,
		value: result.atrules.import.total,
		actuals: Object.keys(result.atrules.import.unique),
	}),

	// Should not contain empty rules
	(result: Analysis) => ({
		id: 'EmptyRules',
		score: result.rules.empty.total,
		value: result.rules.empty.total,
	}),

	// Too many selectors appear multiple times
	(result: Analysis) => {
		const outcome = {
			id: 'SelectorDuplications',
			score: 0,
			value: 1 - result.selectors.uniquenessRatio,
		}

		if (result.selectors.uniquenessRatio < 0.66) {
			outcome.score = Math.floor((1 - result.selectors.uniquenessRatio) * 10)
		}

		return outcome
	},

	// Too many declarations appear multiple times
	(result: Analysis) => {
		const outcome = {
			id: 'DeclarationDuplications',
			score: 0,
			value: 1 - result.declarations.uniquenessRatio,
		}

		if (result.declarations.uniquenessRatio < 0.66) {
			outcome.score = Math.floor((1 - result.declarations.uniquenessRatio) * 10)
		}

		return outcome
	},

	// The total amount of CSS should not be too high
	(result: Analysis) => ({
		id: 'CssSize',
		score: result.stylesheet.size > 200_000 ? 5 : 0,
		value: result.stylesheet.size,
	}),

	// Should not contain (too much) comments
	// Deduct 1 point for every 250 bytes
	(result: Analysis) => {
		const { comments } = result.stylesheet
		return {
			id: 'TooMuchComments',
			score: Math.min(10, Math.floor(comments.size / 250)),
			value: comments.size,
		}
	},

	// Should not contain too much embedded content
	// Deduct 1 point for every 250 bytes
	(result: Analysis) => {
		const { size } = result.stylesheet.embeddedContent
		return {
			id: 'TooMuchEmbeddedContent',
			score: Math.min(20, Math.floor(size.total / 250)),
			value: size.total,
		}
	},
]
