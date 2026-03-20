# CSS Code Quality calculator

<div align="center">
  <img src="logo.png" height="160" width="160" alt="Analyzer logo">
</div>

<div align="center">
  <a href="https://npmjs.org/package/@projectwallace/css-code-quality">
    <img src="https://badgen.net/npm/v/@projectwallace/css-code-quality" alt="version" />
  </a>
  <a href="https://npmjs.org/package/@projectwallace/css-code-quality">
    <img src="https://badgen.now.sh/npm/dm/@projectwallace/css-code-quality" alt="downloads" />
  </a>
  <a href="https://packagephobia.com/result?p=%40projectwallace%2Fcss-code-quality">
    <img src="https://packagephobia.com/badge?p=%40projectwallace%2Fcss-code-quality" alt="install size" />
  </a>
</div>

<div align="center">
  Calculate the Code Quality score of your CSS based on a range of different quality guards.
</div>

---

This package analyzes your CSS on a high level and comes up with a score, divided into three areas:

- **Maintainability**: how difficult is it for someone looking at the CSS from a high level to find the exact spot to fix a bug?
- **Complexity**: how difficult is it for someone to make a change and be confident that they can make that change without side effects?
- **Performance**: How likely is the CSS to have a negative impact on performance, based on high-level metrics? (Not including using hardware accelerated transforms and the like, because other tools are more suited for that.)

## Metrics

### Performance

| Metric | What is tested | Points deducted |
|--------|---------------|-----------------|
| `Imports` | Number of `@import` rules | 10 per `@import` |
| `EmptyRules` | Number of empty rules | 1 per empty rule |
| `SelectorDuplications` | Ratio of duplicate selectors | Up to 10 (when uniqueness ratio < 66%) |
| `DeclarationDuplications` | Ratio of duplicate declarations | Up to 10 (when uniqueness ratio < 66%) |
| `CssSize` | Total CSS file size | 5 if size exceeds 200,000 bytes |
| `TooMuchComments` | Total size of comments | 1 per 250 bytes of comments, max 10 |
| `TooMuchEmbeddedContent` | Total size of embedded content (e.g. base64) | 1 per 250 bytes of embedded content, max 20 |

### Maintainability

| Metric | What is tested | Points deducted |
|--------|---------------|-----------------|
| `SourceLinesOfCode` | Total source lines of code | 1 per 1,000 lines over 10,000, max 15 |
| `AverageSelectorsPerRule` | Average number of selectors per rule | 5 per selector over 2 (average), max 15 |
| `AverageDeclarationsPerRule` | Average number of declarations per rule | 5 per declaration over 5 (average), max 15 |
| `MaxSelectorsPerRule` | Maximum number of selectors in a single rule | 0.5 per selector over 10, max 15 |
| `MaxDeclarationsPerRule` | Maximum number of declarations in a single rule | 0.5 per declaration over 10, max 15 |
| `MoreThanMostCommonSelectorsPerRule` | Rules that have more selectors than the most common count | 0.01 per rule, max 15 (when > 10% of rules exceed the mode) |
| `MoreThanMostCommonDeclarationsPerRule` | Rules that have more declarations than the most common count | 0.01 per rule, max 15 (when > 10% of rules exceed the mode) |

### Complexity

| Metric | What is tested | Points deducted |
|--------|---------------|-----------------|
| `MoreThanMostCommonSelectorComplexity` | Selectors more complex than the most common complexity | 0.01 per selector, max 10 (when > 10% of selectors exceed the mode) |
| `MoreThanMostCommonSelectorSpecificity` | Selectors with higher specificity than the most common specificity | 0.01 per selector, max 10 (when > 10% of selectors exceed the mode) |
| `MaxSelectorComplexity` | Maximum complexity of a single selector | 0.5 per complexity unit over 5, max 5 |
| `AverageSelectorComplexity` | Average selector complexity | 2 per complexity unit over 2 (average), max 10 |
| `IdSelectorRatio` | Ratio of ID selectors | Up to 5 (when ID selector ratio exceeds 1%) |
| `ImportantRatio` | Ratio of `!important` declarations | Up to 5 (when `!important` ratio exceeds 1%) |

## Installation

```bash
npm install @projectwallace/css-code-quality
```

## Usage

```js
import { calculate } from '@projectwallace/css-code-quality'

let css = `my_css { /* ... */ }`
let result = calculate(css)

/*
The result shape looks something like this:

{
  "violations": [ ],
  "passes": [ ],
  "performance": {
    "score": 90,
    "violations": [ ],
    "passes": [ ]
  },
  "maintainability": {
    "score": 100,
    "violations": [ ],
    "passes": [ ]
  },
  "complexity": {
    "score": 97,
    "violations": [ ],
    "passes": [ ]
  }
}

Each `passes` or `violations` array contains an object that looks like this:

{
  "id": "EmptyRules",
  "score": 0,
  "value": 0
},
{
  "id": "AverageSelectorsPerRule",
  "score": 0,
  "value": 1.5,
  "actuals": [
    2,
    1
  ]
}

etc. etc.

*/
```

## Related projects

- [CSS Analyzer](https://github.com/projectwallace/css-analyzer) -
  A CSS Analyzer that goes through your CSS to find all kinds of relevant statistics.
- [Wallace CLI](https://github.com/projectwallace/wallace-cli) - CLI tool for
  @projectwallace/css-analyzer
- [Constyble](https://github.com/projectwallace/constyble) - CSS Complexity linter
- [Color Sorter](https://github.com/projectwallace/color-sorter) - Sort CSS colors
  by hue, saturation, lightness and opacity
