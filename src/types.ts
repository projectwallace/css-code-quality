import type { analyze } from '@projectwallace/css-analyzer'

export type Analysis = ReturnType<typeof analyze>

export type GuardResult = {
	id: string
	score: number
	value: number
	actuals?: unknown
}

export type Guard = (result: Analysis) => GuardResult
