<div align="center">
  CSS A+
</div>

<div align="center">
  Calculate the Code Quality score of your CSS based on a range of different quality guards.
</div>

This package scores your CSS on several criteria and comes up with a score.

* Maintainability
  * Source lines of code (rules, selectors, declarations, atrules)
  * Max/avg/mode # selectors per rule
  * Max/avg/mode # declarations per rule
  * Number of rules with more selectors than mode selectors per rule
  * Number of rules with more declarations than mode declarations per rule
  * Range of selector complexity
  * % of unique declarations (duplication)
* Complexity
  * Selector complexity  (total/mode)
  * Selector specificity
  * Number of atrules like `@supports`, `@media` and `@container`
  * Vendor prefixes
  * Number of selectors more complex than selector mode
  * Number of ID selectors
  * Number of `!important`s
* Performance
  * Number of `@import` statements
  * Filesize
  * Code duplication
    * % of unique selectors
    * % of unique declarations
  * Empty rules
  * (Size of embedded base64 content)