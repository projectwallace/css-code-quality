import { analyze } from '@projectwallace/css-analyzer'
import { calculatePerformanceScore } from './performance.js'

function calculate(css) {
  const result = analyze(css)

  const performanceScore = calculatePerformanceScore(result)
  const maintainability = 100
  const complexity = 100

  return {
    overallScore: 0,
    maintainability: {
      score: maintainability,
    },
    complexity: {
      score: complexity,
    },
    performance: performanceScore,
  }
}

export {
  calculate
}