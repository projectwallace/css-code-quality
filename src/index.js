import { analyze } from '@projectwallace/css-analyzer'
import { guards as performanceGuards } from './performance.js'
import { guards as maintainabilityGuards } from './maintainability.js'

function calculateScore({ result, guards }) {
  let score = 100
  let violations = []
  let passes = []

  for (const guard of guards) {
    const outcome = guard(result)

    if (outcome.score > 0) {
      score -= outcome.score

      violations.push({
        id: outcome.id,
        score: outcome.score,
        value: outcome.value,
      })
    } else {
      passes.push({
        id: outcome.id,
        value: outcome.value,
      })
    }
  }

  return {
    score,
    violations,
    passes,
  }
}

function calculate(css) {
  const result = analyze(css)

  const performance = calculateScore({ result, guards: performanceGuards })
  const maintainability = calculateScore({ result, guards: maintainabilityGuards })

  return {
    score: 0,
    violations: [].concat(performance.violations).concat(maintainability.violations),
    passes: [].concat(performance.passes).concat(maintainability.passes),
    performance,
    maintainability,
    complexity: {},
  }
}

export {
  calculate
}