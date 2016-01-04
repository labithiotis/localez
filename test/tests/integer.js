var __     = require('./../../index.js'),
	assert 	= require('assert');

describe('Integer Tests', function() {

	describe('Varaible Tests', function() {

		it('Longhand "integer"', function(done) {

			var string = __('{{integer number zero(bottles) one(bottle) other(bottles)}}', {number: 10})

			assert.equal(string, '10 bottles')

			done()

		})

		it('Shorthand "i"', function(done) {

			var string = __('{{i number zero(bottles) one(bottle) other(bottles)}}', {number: 10})

			assert.equal(string, '10 bottles')

			done()

		})

	})

	describe('Customize Number Position Tests', function() {

		it('0', function(done) {

			var string = __('{{i number zero(there is %i bottles) one(there are %i bottle) other(there are %i bottles)}}', {number: 0})

			assert.equal(string, 'there is 0 bottles')

			done()

		})

		it('1', function(done) {

			var string = __('{{i number zero(there is %i bottles) one(there is %i bottle) other(there are %i bottles)}}', {number: 1})

			assert.equal(string, 'there is 1 bottle')

			done()

		})

		it('99', function(done) {

			var string = __('{{i number zero(there is %i bottles) one(there is %i bottle) other(there are %i bottles)}}', {number: 99})

			assert.equal(string, 'there are 99 bottles')

			done()

		})

	})

	describe('Option Tests', function() {

		it('Zero', function(done) {

			var string = __('{{i number zero(zero) one(one) two(two) few(few) many(many) other(other)}}', {number: 0})

			assert.equal(string, '0 zero')

			done()

		})

		it('One', function(done) {

			var string = __('{{i number zero(zero) one(one) two(two) few(few) many(many) other(other)}}', {number: 1})

			assert.equal(string, '1 one')

			done()

		})

		it('Two', function(done) {

			var string = __('{{i number zero(zero) one(one) two(two) few(few) many(many) other(other)}}', {number: 2})

			assert.equal(string, '2 two')

			done()

		})

		it('Few', function(done) {

			var string = __('{{i number zero(zero) one(one) two(two) few(few) many(many) other(other)}}', {number: 3})

			assert.equal(string, '3 few')

			done()

		})

		it('Many', function(done) {

			var string = __('{{i number zero(zero) one(one) two(two) few(few) many(many) other(other)}}', {number: 10})

			assert.equal(string, '10 many')

			done()

		})

		it('Other', function(done) {

			var string = __('{{i number zero(zero) one(one) two(two) few(few) many(many) other(other)}}', {number: 99})

			assert.equal(string, '99 other')

			done()

		})

	})

})
