const guards = [

  // Source Lines of Code should be low'
  result => {
    const outcome = {
      id: 'SourceLinesOfCode',
      score: 0,
      value: result.stylesheet.sourceLinesOfCode,
    }

    if (result.stylesheet.sourceLinesOfCode > 10000) {
      // deduct 1 point per 1000 lines of code over 10,000
      outcome.score = Math.floor((result.stylesheet.sourceLinesOfCode - 10000) / 1000)
    }

    return outcome
  },

  // Average count of Selectors per RuleSet should be low
  result => {
    const ALLOWED_SELECTORS_PER_RULESET = 2

    const outcome = {
      id: 'AverageSelectorsPerRule',
      score: 0,
      value: result.rules.selectors.mean,
    }

    // Deduct 5 points per selector over 2
    if (result.rules.selectors.mean > ALLOWED_SELECTORS_PER_RULESET) {
      outcome.score = Math.floor((result.rules.selectors.mean - ALLOWED_SELECTORS_PER_RULESET) * 5)
    }

    return outcome
  },

  // Average count of Declarations per RuleSet should be low
  result => {
    const ALLOWED_DECLARATIONS_PER_RULESET = 5

    const outcome = {
      id: 'AverageDeclarationsPerRule',
      score: 0,
      value: result.rules.declarations.mean,
    }

    // Deduct 5 points per declaration over 5
    if (result.rules.declarations.mean > ALLOWED_DECLARATIONS_PER_RULESET) {
      outcome.score = Math.floor((result.rules.declarations.mean - ALLOWED_DECLARATIONS_PER_RULESET) * 5)
    }

    return outcome
  },
]

export { guards }