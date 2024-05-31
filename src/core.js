import { guards as performanceGuards } from './performance.js'
import { guards as maintainabilityGuards } from './maintainability.js'
import { guards as complexityGuards } from './complexity.js'

/**
 * @param {ReturnType<import('@projectwallace/css-analyzer').analyze>} result
 * @param {performanceGuards | maintainabilityGuards | complexityGuards} guards
 */
function calculateScore(result, guards) {
	let score = 100
	let violations = []
	let passes = []

	for (const guard of guards) {
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

/**
 * @param {ReturnType<import('@projectwallace/css-analyzer').analyze>} analysis
 */
export function calculate(analysis) {
	const performance = calculateScore(analysis, performanceGuards)
	const maintainability = calculateScore(analysis, maintainabilityGuards)
	const complexity = calculateScore(analysis, complexityGuards)

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
