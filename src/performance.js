const guards = [

  // Should not contain @import rules
  result => ({
    id: 'Imports',
    score: result.atrules.import.total * 10,
    value: Object.keys(result.atrules.import.unique),
  }),

  // Should not contain empty rules
  result => ({
    id: 'EmptyRules',
    score: result.rules.empty.total,
    value: result.rules.empty.total,
  }),

  // Too many selectors appear multiple times
  result => {
    const outcome = {
      id: 'SelectorDuplications',
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

  // Too many declarations appear multiple times
  result => {
    const outcome = {
      id: 'DeclarationDuplications',
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

  // The total amount of CSS should not be too high
  result => ({
    id: 'CssSize',
    score: result.stylesheet.size > 200_000 ? 5 : 0,
    value: result.stylesheet.size,
  })
]

export { guards }