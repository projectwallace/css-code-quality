import { analyze, type CountResult } from '@projectwallace/css-analyzer'
import {
	atrules,
	declarations,
	rules,
	selectors,
	specificity,
	stylesheet,
} from '@projectwallace/css-analyzer/collectors'

type Collectors = {
	stylesheet: ReturnType<typeof stylesheet>
	atrules: ReturnType<typeof atrules>
	rules: ReturnType<typeof rules>
	selectors: ReturnType<typeof selectors>
	specificity: ReturnType<typeof specificity>
	declarations: ReturnType<typeof declarations>
}

export const collectors: Collectors = {
	stylesheet: stylesheet(),
	atrules: atrules(),
	rules: rules(),
	selectors: selectors(),
	specificity: specificity(),
	declarations: declarations(),
}

export type Analysis = ReturnType<typeof analyze<Collectors>>

export type GuardResult = {
	id: string
	score: number
	value: number
	actuals?: unknown
}

export type Guard = (result: Analysis) => GuardResult

/** Expand a count result into a flat list, one entry per occurrence */
export function items<T extends string | number>(counts: CountResult<T>): T[] {
	return [...counts.unique].flatMap(([item, { count }]) =>
		Array.from({ length: count }, () => item),
	)
}
