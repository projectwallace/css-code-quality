import { guards as performanceGuards } from './performance.js'
import { guards as maintainabilityGuards } from './maintainability.js'
import { guards as complexityGuards } from './complexity.js'

/**
 * @typedef Outcome
 * @property {string} id
 * @property {number} score
 * @property {number} number
 * @property {number? | number[]? | string[]?} actuals
 */

function calculateScore({ result, guards }) {
	let score = 100
	/** @type {Outcome[]} */
	let violations = []
	/** @type {Outcome[]} */
	let passes = []

	for (const guard of guards) {
		/** @type Outcome */
		const outcome = guard(result)

		if (outcome.score > 0) {
			score -= outcome.score
			violations.push(outcome)
		} else {
			passes.push(outcome)
		}
	}

	return {
		score: Math.max(score, 0),
		violations,
		passes,
	}
}

export function calculate(analysis) {
	const performance = calculateScore({ result: analysis, guards: performanceGuards })
	const maintainability = calculateScore({ result: analysis, guards: maintainabilityGuards })
	const complexity = calculateScore({ result: analysis, guards: complexityGuards })

	return {
		/** @deprecated */
		score: 0,
		violations: performance.violations
			.concat(maintainability.violations)
			.concat(complexity.violations),
		passes: performance.passes
			.concat(maintainability.passes)
			.concat(complexity.passes),
		performance,
		maintainability,
		complexity,
	}
}
