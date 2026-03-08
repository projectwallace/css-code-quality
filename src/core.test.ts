import { describe, it, expect } from 'vitest'
import { calculate } from '../dist/core.js'

describe('Core', () => {
	it('exports calculate', () => {
		expect(typeof calculate).toBe('function')
	})
})
