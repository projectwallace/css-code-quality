import { compareSpecificity } from '@projectwallace/css-analyzer'

const guards = [

  // Complexity per Selector should not differ too much from the most common Complexity
  result => {
    const mode = result.selectors.complexity.mode
    const selectorsAboveMode = result.selectors.complexity.items
      .filter(c => c > mode)
      .length

    const outcome = {
      id: 'MoreThanMostCommonSelectorComplexity',
      score: 0,
      value: mode,
    }

    if (selectorsAboveMode > result.selectors.total * 0.1) {
      const score = Math.floor(selectorsAboveMode * 0.01)
      outcome.score = Math.min(10, score)
    }

    return outcome
  },

  // Specificity per Selector should not differ too much from the most common Specificity
  result => {
    const mode = result.selectors.specificity.mode
    const selectorsAboveMode = result.selectors.specificity.items
      .filter(c => compareSpecificity(c, mode) < 0)
      .length

    const outcome = {
      id: 'MoreThanMostCommonSelectorSpecificity',
      score: 0,
      value: mode,
    }

    if (selectorsAboveMode > result.selectors.total * 0.1) {
      const score = Math.floor(selectorsAboveMode * 0.01)
      outcome.score = Math.min(10, score)
    }

    return outcome
  },

  // Maximum Selector Complexity should be low
  result => {
    const MAX_SELECTOR_COMPLEXITY = 5
    const actual = result.selectors.complexity.max

    const outcome = {
      id: 'MaxSelectorComplexity',
      score: 0,
      value: result.selectors.complexity.max,
    }

    // Deduct 0.5 points per complexity over 5, up to 5 points
    if (actual > MAX_SELECTOR_COMPLEXITY) {
      const score = Math.ceil((actual - MAX_SELECTOR_COMPLEXITY) * 0.5)
      outcome.score = Math.min(5, score)
    }

    return outcome
  },

  // Average Selector Complexity should be low
  result => {
    const ALLOWED_COMPLEXITY = 2
    const actual = result.selectors.complexity.mean

    const outcome = {
      id: 'AverageSelectorComplexity',
      score: 0,
      value: actual,
    }

    // Deduct 2 points per selector over 2
    if (actual > ALLOWED_COMPLEXITY) {
      const score = Math.ceil((actual - ALLOWED_COMPLEXITY) * 2)
      outcome.score = Math.min(10, score)
    }

    return outcome
  },

  result => {
    const ALLOWED = 0.01
    const actual = result.selectors.id.ratio
    const outcome = {
      id: 'IdSelectorRatio',
      score: 0,
      value: actual,
    }

    if (actual > ALLOWED) {
      const score = Math.floor((actual - ALLOWED) * 10)
      outcome.score = Math.min(score, 5)
    }

    return outcome
  },

  result => {
    const ALLOWED = 0.01
    const actual = result.declarations.importants.ratio
    const outcome = {
      id: 'ImportantRatio',
      score: 0,
      value: actual,
    }

    if (actual > ALLOWED) {
      const score = Math.floor((actual - ALLOWED) * 10)
      outcome.score = Math.min(score, 5)
    }

    return outcome
  },
]

export {
  guards
}