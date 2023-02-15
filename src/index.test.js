import * as assert from 'uvu/assert'
import { suite } from 'uvu'
import { calculate } from './index.js'
import { calculate as pkgCalculate } from '../dist/css-code-quality.modern.js'

const Index = suite('Index')

Index('exposes a calculcate function', () => {
	assert.is(typeof calculate, 'function')
})

Index.run()

const Package = suite('NPM Package')

Package('exposes a calculate function', () => {
	assert.is(typeof pkgCalculate, 'function')
})

Package.run()