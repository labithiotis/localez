var __     = require('./../../index.js'),
	assert 	= require('assert');

describe('Gender Tests', function() {

	describe('Varaible Tests', function() {

		it('Longhand "gender"', function(done) {

			var string = __('I am a {{gender type male(man) female(women) unisex(alien)}}!', {type: 'male'})

			assert.equal(string, 'I am a man!')

			done()

		})

		it('Shorthand "g"', function(done) {

			var string = __('I am a {{g type male(man) female(women) unisex(alien)}}!', {type: 'male'})

			assert.equal(string, 'I am a man!')

			done()

		})

	})

	describe('Option Tests', function() {

		it('Male', function(done) {

			var string = __('I am a {{g type male(man) female(women) unisex(alien)}}!', {type: 'male'})

			assert.equal(string, 'I am a man!')

			done()

		})

		it('Female', function(done) {

			var string = __('I am a {{g type male(man) female(women) unisex(alien)}}!', {type: 'female'})

			assert.equal(string, 'I am a women!')

			done()

		})

		it('Unisex', function(done) {

			var string = __('I am a {{g type male(man) female(women) unisex(alien)}}!', {type: 'unisex'})

			assert.equal(string, 'I am a alien!')

			done()

		})

		it('Custom', function(done) {

			var string = __('I am a {{g type whatever(wtf?) male(man) female(women) unisex(alien, wtf?)}}!', {type: 'whatever'})

			assert.equal(string, 'I am a wtf?!')

			done()

		})

	})

})
