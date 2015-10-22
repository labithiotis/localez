var __ = require('./../../index.js')({debug:false}),
		assert 	= require('assert');

describe('Number Tests', function() {

	describe('Varaible Tests', function() {

		it('Longhand "number"', function(done) {

			var string = __('{{number number zero(bottles) one(bottle) other(bottles)}}', {number: 10})

			assert.equal(string, 'ten bottles')

			done();

		})

		it('Shorthand "n"', function(done) {

			var string = __('{{n number zero(bottles) one(bottle) other(bottles)}}', {number: 10})

			assert.equal(string, 'ten bottles')

			done();

		})

	})

	describe('Option Tests', function() {

		it('Zero', function(done) {

			var string = __('{{n number zero(zero) one(one) two(two) few(few) many(many) other(other)}}', {number: 0})

			assert.equal(string, 'zero zero')

			done();

		})

		it('One', function(done) {

			var string = __('{{n number zero(zero) one(one) two(two) few(few) many(many) other(other)}}', {number: 1})

			assert.equal(string, 'one one')

			done();

		})

		it('Two', function(done) {

			var string = __('{{n number zero(zero) one(one) two(two) few(few) many(many) other(other)}}', {number: 2})

			assert.equal(string, 'two two')

			done();

		})

		it('Few', function(done) {

			var string = __('{{n number zero(zero) one(one) two(two) few(few) many(many) other(other)}}', {number: 3})

			assert.equal(string, 'three few')

			done();

		})

		it('Many', function(done) {

			var string = __('{{n number zero(zero) one(one) two(two) few(few) many(many) other(other)}}', {number: 10})

			assert.equal(string, 'ten many')

			done();

		})

		it('Other', function(done) {

			var string = __('{{n number zero(zero) one(one) two(two) few(few) many(many) other(other)}}', {number: 99})

			assert.equal(string, 'ninety-nine other')

			done();

		})

	})

})
