import { analyze } from '@projectwallace/css-analyzer'
import { calculate as calculateFromAnalysis } from './core.js'

/**
 * @param {string} css
 */
export function calculate(css) {
	const analysis = analyze(css)
	// @ts-expect-error types stuff is wrong
	return calculateFromAnalysis(analysis)
}
