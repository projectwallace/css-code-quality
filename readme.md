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

## Installation

```bash
npm install @projectwallace/css-code-quality
```

## Usage

```js
import { calculate } from "@projectwallace/css-code-quality";

let css = `my_css { /* ... */ }`;
let result = calculate(css);

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
