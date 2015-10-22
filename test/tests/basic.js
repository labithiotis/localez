var __ = require('./../../index.js')({debug:false}),
		assert 	= require('assert');

describe('Basic Tests', function() {

		it('"hello" when passed "hello"', function(done) {

			assert.equal(__('hello'), 'hello')

			done()

		})

		it('Check special caharacters', function(done) {

			var string = __('!@£$%^&*()_+=-[]{}":;\'\'.,><>?//>>!?~~±!£±€#¢¡º¶∞§¶ª¡–≠¡"')

			assert.equal(string, '!@£$%^&*()_+=-[]{}":;\'\'.,><>?//>>!?~~±!£±€#¢¡º¶∞§¶ª¡–≠¡"')

			done()

		})

})
