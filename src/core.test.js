import * as assert from 'uvu/assert'
import { suite } from 'uvu'
import { calculate } from './core.js'

const Core = suite('Core')

Core('exports calculate', () => {
	assert.is(typeof calculate, 'function')
})

Core.run()
