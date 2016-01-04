var __     = require('./../../index.js'),
    assert = require('assert');

describe('Basic Tests', function () {

    it('"hello" when passed "hello"', function (done) {

        assert.equal(__('hello'), 'hello')

        done()

    })

    it('Check special characters', function (done) {

        var text = '!@£$%^&*()_+=-[]{}":;\'\'.,><>?//>>!?~~±!£±€#¢¡º¶∞§¶ª¡–≠¡"',
            string = __(text)

        assert.equal(string, text)

        done()

    })

})
