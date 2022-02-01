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

This package analyzes your CSS on a high level and comes up with a score, divided in three areas:

- **Maintainability**: how difficult is it for someone looking at the CSS from a high level to find the exact spot to fix a bug?
- **Complexity**: how difficult is it for someone to make a change and them being confident that they can make that change without side-effects?
- **Performance**: How likely is the CSS to have a negative impact on performance, based on high-level metrics? (Not including using hardware accelerated transforms and the like, because other tools are more suite for that.)
