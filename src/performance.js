const guards = [
  result => ({
    id: 'NoImports',
    description: 'Should not contain @import rules',
    score: result.atrules.import.total * 10,
    value: Object.keys(result.atrules.import.unique),
  }),
  result => ({
    id: 'NoEmptyRules',
    description: 'Should not contain empty rules',
    score: result.rules.empty.total,
    value: result.rules.empty.total
  }),
  result => {
    const outcome = {
      id: 'TooManySelectorDuplications',
      description: 'Too many selectors appear multiple times',
      score: 0,
      value: result.selectors.uniquenessRatio,
    }

    if (result.selectors.uniquenessRatio < 0.75) {
      // Math.floor((1 - 0.75)*10)
      // Math.floor(0.25 * 10)
      // Math.floor(2.5)
      // 2
      outcome.score = Math.floor((1 - result.selectors.uniquenessRatio) * 10)
    }

    return outcome
  },
  result => {
    const outcome = {
      id: 'TooManyDeclarationDuplications',
      description: 'Too many declarations appear multiple times',
      score: 0,
      value: result.declarations.unique.ratio,
    }

    if (result.declarations.unique.ratio < 0.75) {
      // Math.floor((1 - 0.75)*10)
      // Math.floor(0.25 * 10)
      // Math.floor(2.5)
      // 2
      outcome.score = Math.floor((1 - result.declarations.unique.ratio) * 10)
    }

    return outcome
  },
  result => ({
    id: 'TooMuchCSS',
    description: 'There is too much CSS',
    score: result.stylesheet.size > 200_000 ? 5 : 0,
    value: result.stylesheet.size,
  })
]

function calculatePerformanceScore(result) {
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
        description: outcome.description,
        value: outcome.value,
      })
    } else {
      passes.push({
        id: outcome.id,
        description: outcome.description,
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

export { calculatePerformanceScore }