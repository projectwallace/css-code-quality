import { describe, it, expect } from 'vitest'
import { calculate } from './core'

describe('Core', () => {
	it('exports calculate', () => {
		expect(typeof calculate).toBe('function')
	})
})
