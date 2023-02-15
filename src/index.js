import { analyze } from '@projectwallace/css-analyzer'
import { calculate as calculateFromAnalysis } from './core.js'

export function calculate(css) {
	const analysis = analyze(css)
	return calculateFromAnalysis(analysis)
}
