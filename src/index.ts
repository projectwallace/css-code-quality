import { analyze } from '@projectwallace/css-analyzer'
import { calculate as calculateFromAnalysis } from './core.js'
import { collectors } from './types.js'

export function calculate(css: string): ReturnType<typeof calculateFromAnalysis> {
	return calculateFromAnalysis(analyze(css, collectors))
}
