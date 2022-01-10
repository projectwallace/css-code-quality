import { analyze } from '@projectwallace/css-analyzer'
import { guards as performanceGuards } from './performance.js'
import { guards as maintainabilityGuards } from './maintainability.js'
import { guards as complexityGuards } from './complexity.js'

function calculateScore({ result, guards }) {
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

function calculate(css) {
  const result = analyze(css)

  const performance = calculateScore({ result, guards: performanceGuards })
  const maintainability = calculateScore({ result, guards: maintainabilityGuards })
  const complexity = calculateScore({ result, guards: complexityGuards })

  return {
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

export {
  calculate
}