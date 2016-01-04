var __     = require('./../../index.js'),
	path = require('path'),
	assert = require('assert');

describe('Combo Locale Tests', function() {

	before(function() {

		//__.load('fr', path.resolve(__dirname + '/locales/fr.js'))

	})

	describe('Preloaded', function() {

		it('Check combo of integer with nested gender', function(done) {

			var string = __('You are {{n amount zero({{g target male(%n sexy man) female(%n sexy lady)}}) other({{g target male(sexy men) female(sexy ladies)}}) }}.', {amount: 2, target: 'female'});

			assert.equal(string, 'You are two sexy ladies.');

			done()

		})

	})

})
