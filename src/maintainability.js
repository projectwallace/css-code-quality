export const guards = [

  // Source Lines of Code should be low
  /** @param {ReturnType<import('@projectwallace/css-analyzer').analyze>} result */
  result => {
    const outcome = {
      id: 'SourceLinesOfCode',
      score: 0,
      value: result.stylesheet.sourceLinesOfCode,
    }

    if (result.stylesheet.sourceLinesOfCode > 10000) {
      // deduct 1 point per 1000 lines of code over 10,000
      const score = Math.floor((result.stylesheet.sourceLinesOfCode - 10000) / 1000)
      outcome.score = Math.min(15, score)
    }

    return outcome
  },

  // Average count of Selectors per RuleSet should be low
  /** @param {ReturnType<import('@projectwallace/css-analyzer').analyze>} result */
  result => {
    const ALLOWED_SELECTORS_PER_RULESET = 2
    const actual = result.rules.selectors.mean

    const outcome = {
      id: 'AverageSelectorsPerRule',
      score: 0,
      value: actual,
      actuals: result.rules.selectors.items,
    }

    // Deduct 5 points per selector over 2
    if (actual > ALLOWED_SELECTORS_PER_RULESET) {
      const score = Math.floor((actual - ALLOWED_SELECTORS_PER_RULESET) * 5)
      outcome.score = Math.min(15, score)
    }

    return outcome
  },

  // Average count of Declarations per RuleSet should be low
  /** @param {ReturnType<import('@projectwallace/css-analyzer').analyze>} result */
  result => {
    const ALLOWED_DECLARATIONS_PER_RULESET = 5

    const outcome = {
      id: 'AverageDeclarationsPerRule',
      score: 0,
      value: result.rules.declarations.mean,
      actuals: result.rules.declarations.items,
    }

    // Deduct 5 points per declaration over 5
    if (result.rules.declarations.mean > ALLOWED_DECLARATIONS_PER_RULESET) {
      const score = Math.floor((result.rules.declarations.mean - ALLOWED_DECLARATIONS_PER_RULESET) * 5)
      outcome.score = Math.min(15, score)
    }

    return outcome
  },

  // Max number of Selectors per Rule should be low
  /** @param {ReturnType<import('@projectwallace/css-analyzer').analyze>} result */
  result => {
    const MAX_SELECTORS_PER_RULESET = 10

    const outcome = {
      id: 'MaxSelectorsPerRule',
      score: 0,
      value: result.rules.selectors.max,
      actuals: result.rules.selectors.items,
    }

    // Deduct 0.5 points per selectors over 10
    if (result.rules.selectors.max > MAX_SELECTORS_PER_RULESET) {
      const score = Math.ceil((result.rules.selectors.max - MAX_SELECTORS_PER_RULESET) * 0.5)
      outcome.score = Math.min(score, 15)
    }

    return outcome
  },

  // Max number of Declarations per Rule should be low
  /** @param {ReturnType<import('@projectwallace/css-analyzer').analyze>} result */
  result => {
    const MAX_DECLARATIONS_PER_RULESET = 10

    const outcome = {
      id: 'MaxDeclarationsPerRule',
      score: 0,
      value: result.rules.declarations.max,
      actuals: result.rules.declarations.items,
    }

    // Deduct 0.5 points per declarations over 10
    if (result.rules.declarations.max > MAX_DECLARATIONS_PER_RULESET) {
      const score = Math.ceil((result.rules.declarations.max - MAX_DECLARATIONS_PER_RULESET) * 0.5)
      outcome.score = Math.min(15, score)
    }

    return outcome
  },

  // Number of Selectors per RuleSet should not differ too much from the most common amount of
  // Selectors per RuleSet
  /** @param {ReturnType<import('@projectwallace/css-analyzer').analyze>} result */
  result => {
    const mode = result.rules.selectors.mode
    const rulesHavingMoreThanMode = result.rules.selectors.items
      .filter(item => item > mode)
      .length

    const outcome = {
      id: 'MoreThanMostCommonSelectorsPerRule',
      score: 0,
      value: result.rules.selectors.mode,
      actuals: result.rules.selectors.items,
    }

    // if more than 10% of RuleSets has more Selectors than most common:
    if (rulesHavingMoreThanMode > result.rules.total * 0.1) {
      // then deduct 0.01 for ever applicable RuleSet
      const score = Math.floor(rulesHavingMoreThanMode * 0.01)
      // with a maximum of 10 points
      outcome.score = Math.min(15, score)
    }

    return outcome
  },

  // Number of Declarations per RuleSet should not differ too much from the most common amount of
  // Declarations per RuleSet
  /** @param {ReturnType<import('@projectwallace/css-analyzer').analyze>} result */
  result => {
    const mode = result.rules.selectors.mode
    const rulesHavingMoreThanMode = result.rules.declarations.items.filter(item => item > mode).length

    const outcome = {
      id: 'MoreThanMostCommonDeclarationsPerRule',
      score: 0,
      value: result.rules.declarations.mode,
      actuals: result.rules.declarations.items,
    }

    // if more than 10% of RuleSets has more Declarations than most common:
    if (rulesHavingMoreThanMode > result.rules.total * 0.1) {
      // then deduct 0.01 for ever applicable RuleSet
      const score = Math.floor(rulesHavingMoreThanMode * 0.01)
      // with a maximum of 10 points
      outcome.score = Math.min(15, score)
    }

    return outcome
  },
]
