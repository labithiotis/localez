var __     = require('./../../index.js'),
	assert 	= require('assert');

describe('Number Tests', function() {

	describe('Varaible Tests', function() {

		it('Longhand "number"', function(done) {

			var string = __('{{number number zero(bottles) one(bottle) other(bottles)}}', {number: 10})

			assert.equal(string, 'ten bottles')

			done()

		})

		it('Shorthand "n"', function(done) {

			var string = __('{{n number zero(bottles) one(bottle) other(bottles)}}', {number: 10})

			assert.equal(string, 'ten bottles')

			done()

		})

	})

	describe('Customize Number Position Tests', function() {

		it('0', function(done) {

			var string = __('{{n number zero(there is %i bottles) one(there is %i bottle) other(there are %i bottles)}}', {number: 0})

			assert.equal(string, 'there is zero bottles')

			done()

		})

		it('1', function(done) {

			var string = __('{{n number zero(there is %i bottles) one(there is %i bottle) other(there are %i bottles)}}', {number: 1})

			assert.equal(string, 'there is one bottle')

			done()

		})

		it('99', function(done) {

			var string = __('{{n number zero(there is %i bottles) one(there is %i bottle) other(there are %i bottles)}}', {number: 99})

			assert.equal(string, 'there are ninety-nine bottles')

			done()

		})

	})

	describe('Option Tests', function() {

		it('Zero', function(done) {

			var string = __('{{n number zero(zero) one(one) two(two) few(few) many(many) other(other)}}', {number: 0})

			assert.equal(string, 'zero zero')

			done()

		})

		it('One', function(done) {

			var string = __('{{n number zero(zero) one(one) two(two) few(few) many(many) other(other)}}', {number: 1})

			assert.equal(string, 'one one')

			done()

		})

		it('Two', function(done) {

			var string = __('{{n number zero(zero) one(one) two(two) few(few) many(many) other(other)}}', {number: 2})

			assert.equal(string, 'two two')

			done()

		})

		it('Few', function(done) {

			var string = __('{{n number zero(zero) one(one) two(two) few(few) many(many) other(other)}}', {number: 3})

			assert.equal(string, 'three few')

			done()

		})

		it('Many', function(done) {

			var string = __('{{n number zero(zero) one(one) two(two) few(few) many(many) other(other)}}', {number: 10})

			assert.equal(string, 'ten many')

			done()

		})

		it('Other', function(done) {

			var string = __('{{n number zero(zero) one(one) two(two) few(few) many(many) other(other)}}', {number: 99})

			assert.equal(string, 'ninety-nine other')

			done()

		})

	})

	describe('Value Tests', function() {

		//for(var i = 4; i < 200; i++){ n.push(__('{{n n other(*)}}', {n: i}).replace(' *', '')) }

		var numbers = ['four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty','twenty-one','twenty-two','twenty-three','twenty-four','twenty-five','twenty-six','twenty-seven','twenty-eight','twenty-nine','thirty','thirty-one','thirty-two','thirty-three','thirty-four','thirty-five','thirty-six','thirty-seven','thirty-eight','thirty-nine','forty','forty-one','forty-two','forty-three','forty-four','forty-five','forty-six','forty-seven','forty-eight','forty-nine','fifty','fifty-one','fifty-two','fifty-three','fifty-four','fifty-five','fifty-six','fifty-seven','fifty-eight','fifty-nine','sixty','sixty-one','sixty-two','sixty-three','sixty-four','sixty-five','sixty-six','sixty-seven','sixty-eight','sixty-nine','seventy','seventy-one','seventy-two','seventy-three','seventy-four','seventy-five','seventy-six','seventy-seven','seventy-eight','seventy-nine','eighty','eighty-one','eighty-two','eighty-three','eighty-four','eighty-five','eighty-six','eighty-seven','eighty-eight','eighty-nine','ninety','ninety-one','ninety-two','ninety-three','ninety-four','ninety-five','ninety-six','ninety-seven','ninety-eight','ninety-nine','one hundred ','one hundred one','one hundred two','one hundred three','one hundred four','one hundred five','one hundred six','one hundred seven','one hundred eight','one hundred nine','one hundred ten','one hundred eleven','one hundred twelve','one hundred thirteen','one hundred fourteen','one hundred fifteen','one hundred sixteen','one hundred seventeen','one hundred eighteen','one hundred nineteen','one hundred twenty','one hundred twenty-one','one hundred twenty-two','one hundred twenty-three','one hundred twenty-four','one hundred twenty-five','one hundred twenty-six','one hundred twenty-seven','one hundred twenty-eight','one hundred twenty-nine','one hundred thirty','one hundred thirty-one','one hundred thirty-two','one hundred thirty-three','one hundred thirty-four','one hundred thirty-five','one hundred thirty-six','one hundred thirty-seven','one hundred thirty-eight','one hundred thirty-nine','one hundred forty','one hundred forty-one','one hundred forty-two','one hundred forty-three','one hundred forty-four','one hundred forty-five','one hundred forty-six','one hundred forty-seven','one hundred forty-eight','one hundred forty-nine','one hundred fifty','one hundred fifty-one','one hundred fifty-two','one hundred fifty-three','one hundred fifty-four','one hundred fifty-five','one hundred fifty-six','one hundred fifty-seven','one hundred fifty-eight','one hundred fifty-nine','one hundred sixty','one hundred sixty-one','one hundred sixty-two','one hundred sixty-three','one hundred sixty-four','one hundred sixty-five','one hundred sixty-six','one hundred sixty-seven','one hundred sixty-eight','one hundred sixty-nine','one hundred seventy','one hundred seventy-one','one hundred seventy-two','one hundred seventy-three','one hundred seventy-four','one hundred seventy-five','one hundred seventy-six','one hundred seventy-seven','one hundred seventy-eight','one hundred seventy-nine','one hundred eighty','one hundred eighty-one','one hundred eighty-two','one hundred eighty-three','one hundred eighty-four','one hundred eighty-five','one hundred eighty-six','one hundred eighty-seven','one hundred eighty-eight','one hundred eighty-nine','one hundred ninety','one hundred ninety-one','one hundred ninety-two','one hundred ninety-three','one hundred ninety-four','one hundred ninety-five','one hundred ninety-six','one hundred ninety-seven','one hundred ninety-eight','one hundred ninety-nine']

		numbers.forEach(function(number, i) {

			var n = i + 4;

			it(n + ' -> ' + number, function(done) {

				assert.equal(__('{{n n other(test)}}', {n: n }), '' + number + ' test')

				done()

			})

		})

		it('3298241 -> three million two hundred ninety-eight thousand two hundred forty-one', function(done) {

				var string =  __('{{n n other(*)}}', {n: 3298241}).replace(' *', '')

				assert(string, 'three million two hundred ninety-eight thousand two hundred forty-one')

				done()

		})

		it('928981283717481 -> nine hundred twenty-eight trillion nine hundred eighty-one billion two hundred eighty-three million seven hundred seventeen thousand four hundred eighty-one', function(done) {

				var string =  __('{{n n other(*)}}', {n: 928981283717481}).replace(' *', '')

				assert(string, 'nine hundred twenty-eight trillion nine hundred eighty-one billion two hundred eighty-three million seven hundred seventeen thousand four hundred eighty-one')

				done()

		})

	})

})
