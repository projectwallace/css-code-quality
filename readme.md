<div align="center">
  <h1>CSS Code Quality</h1>
</div>

<div align="center">
  Calculate the Code Quality score of your CSS based on a range of different quality guards.
</div>

This package scores your CSS on several criteria and comes up with a score.

- [x] Maintainability
  - [x] Source lines of code
  - [x] Average # selectors per rule
  - [x] Max # selectors per rule
  - [x] Average # declarations per rule
  - [x] Max # declarations per rule
  - [x] Number (or %) of rules with more selectors than mode selectors per rule
  - [x] Number (or %) of rules with more declarations than mode declarations per rule
- [ ] Complexity
  - [ ] Selector complexity (total/mode)
  - [ ] Selector specificity
  - [ ] Number of atrules like `@supports`, `@media` and `@container`
  - [ ] Vendor prefixes
  - [ ] Number of selectors more complex than selector mode (or mean)
  - [ ] Number of ID selectors
  - [ ] Number of `!important`s
- [x] Performance
  - [x] Number of `@import` statements
  - [x] Filesize
  - [x] Code duplication
    - [x] % of unique selectors
    - [x] % of unique declarations
  - [x] Empty rules

### Metrics for consideration

- [ ] Maintainability: Range of selector complexity
- [ ] Performance: Size and % of embedded base64 content