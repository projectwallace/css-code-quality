<div align="center">
  <h1>CSS Code Quality</h1>
</div>

<div align="center">
  Calculate the Code Quality score of your CSS based on a range of different quality guards.
</div>

This package analyzes your CSS on a high level and comes up with a score, divided in three areas:

- Maintainability: how difficult is it for someone looking at the CSS from a high level to find the exact spot to fix a bug?
- Complexity: how difficult is it for someone to make a change and them being confident that they can make that change without side-effects?
- Performance: How likely is the CSS to have a negative impact on performance, based on high-level metrics? (Not including using hardware accelerated transforms and the like, because other tools are more suite for that.)

- [x] Maintainability
  - [x] Source lines of code
  - [x] Average # selectors per rule
  - [x] Max # selectors per rule
  - [x] Average # declarations per rule
  - [x] Max # declarations per rule
  - [x] Number (or %) of rules with more selectors than mode selectors per rule
  - [x] Number (or %) of rules with more declarations than mode declarations per rule
- [ ] Complexity
  - [x] Number (or %) of Selectors with higher Complexity than mode Selector Complexity
  - [x] Number (or %) of Selectors with higher Specificity than mode Selector Specificity
  - [x] Average Selector complexity
  - [x] % of ID selectors should be low
  - [x] % of `!important`s should be low
- [x] Performance
  - [x] Number of `@import` statements
  - [x] Filesize
  - [x] Code duplication
    - [x] % of unique selectors
    - [x] % of unique declarations
  - [x] Empty rules

### Metrics for consideration

- [ ] Number or % of atrules like `@supports`, `@media` and `@container`
- [ ] % of Keyframe vendor prefixes should be low
- [ ] % of property vendor prefixes should be low
- [ ] % of vendor prefixed Selectors should be low
- [ ] % of vendor prefixed Values should be low
- [ ] Average Selector specificity
- [ ] Maintainability: Range of selector complexity
- [ ] Performance: Size and % of embedded base64 content