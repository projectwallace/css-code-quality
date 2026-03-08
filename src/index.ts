import { analyze } from '@projectwallace/css-analyzer'
import { calculate as calculateFromAnalysis } from './core.js'

export function calculate(css: string) {
	const analysis = analyze(css)
	// @ts-expect-error ReturnType<typeof analyze> resolves to the last overload (useLocations:true)
	// but we call without options (useLocations:false). Guards only access common fields, so this is safe.
	return calculateFromAnalysis(analysis)
}
