var __ = require('./../../index.js')({debug:false}),
		assert 	= require('assert');

describe('Integer Tests', function() {

	describe('Varaible Tests', function() {

		it('Longhand "integer"', function(done) {

			var string = __('{{integer number zero( bottles) one( bottle) other( bottles)}}', {number: 10})

			assert.equal(string, '10 bottles')

			done();

		})

		it('Shorthand "i"', function(done) {

			var string = __('{{i number zero( bottles) one( bottle) other( bottles)}}', {number: 10})

			assert.equal(string, '10 bottles')

			done();

		})

	})

	describe('Option Tests', function() {

		it('Zero', function(done) {

			var string = __('{{i number zero( zero) one( one) two( two) few( few) many( many) other( other)}}', {number: 0})

			assert.equal(string, '0 zero')

			done();

		})

		it('One', function(done) {

			var string = __('{{i number zero( zero) one( one) two( two) few( few) many( many) other( other)}}', {number: 1})

			assert.equal(string, '1 one')

			done();

		})

		it('Two', function(done) {

			var string = __('{{i number zero( zero) one( one) two( two) few( few) many( many) other( other)}}', {number: 2})

			assert.equal(string, '2 two')

			done();

		})

		it('Few', function(done) {

			var string = __('{{i number zero( zero) one( one) two( two) few( few) many( many) other( other)}}', {number: 3})

			assert.equal(string, '3 few')

			done();

		})

		it('Many', function(done) {

			var string = __('{{i number zero( zero) one( one) two( two) few( few) many( many) other( other)}}', {number: 10})

			assert.equal(string, '10 many')

			done();

		})

		it('Other', function(done) {

			var string = __('{{i number zero( zero) one( one) two( two) few( few) many( many) other( other)}}', {number: 99})

			assert.equal(string, '99 other')

			done();

		})

	})

})
