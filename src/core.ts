import { guards as performanceGuards } from './performance.js'
import { guards as maintainabilityGuards } from './maintainability.js'
import { guards as complexityGuards } from './complexity.js'
import type { Analysis, Guard, GuardResult } from './types.js'

function calculateScore(result: Analysis, guards: Guard[]) {
	let score = 100
	const violations: GuardResult[] = []
	const passes: GuardResult[] = []

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

export function calculate(analysis: Analysis) {
	const performance = calculateScore(analysis, performanceGuards)
	const maintainability = calculateScore(analysis, maintainabilityGuards)
	const complexity = calculateScore(analysis, complexityGuards)

	return {
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
