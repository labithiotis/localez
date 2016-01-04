var __     = require('./../../index.js'),
	path = require('path'),
	assert = require('assert');

describe('Load Locale Tests', function() {

	before(function() {

		__.load('fr', path.resolve(__dirname + '/locales/fr.js'))

	})

	describe('Preloaded', function() {

		it('Return "Bonjour" when passed "hello" for lang "fr" using param', function(done) {

			assert.equal(__('hello', null, 'fr'), 'Bonjour')

			assert.notEqual(__('hello', null, 'fr'), 'hello')

			done()

		})

		it('Return "Bonjour" when passed "hello" for lang "fr" using method', function(done) {

			__.set('fr')

			assert.equal(__('hello'), 'Bonjour')

			assert.notEqual(__('hello'), 'hello')

			done()

		})

	})

	describe('Locale Swiching', function() {

		it('Return "Bonjour" when passed "hello" for lang "fr"', function(done) {

			__.set('fr')

			assert.equal(__('hello'), 'Bonjour')

			done()

		})

		it('Not return "Bonjour" when passed "hello" for lang "en"', function(done) {

			__.set('en')

			assert.notEqual(__('hello'), 'Bonjour')

			done()

		})

		it('Alternating lang within some calls', function(done) {

			__.set('fr')

			assert.equal(__('hello'), 'Bonjour')

			__.set('en')

			assert.equal(__('hello'), 'hello')

			done()

		})

	})

})
