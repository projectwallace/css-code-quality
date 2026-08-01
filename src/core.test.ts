import { describe, test, expect } from 'vitest'
import { calculate } from './core'

describe('Core', () => {
	test('exports calculate', () => {
		expect(typeof calculate).toBe('function')
	})
})
