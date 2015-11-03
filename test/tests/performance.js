var __     = require('./../../index.js'),
    assert = require('assert');

describe('Performance Tests', function () {

    it('Doing 10,000 basic queries', function (done) {

        var i     = 0,
            time  = 0,
            start = Date.now();

        for (i; i < 10000; i++) {
            __('hello')
        }

        time = Date.now() - start;

        if (time > 50) throw new Error('Time to process 10,000 queries took over 50ms, it took: ' + time + 'ms')

        done()

    })

    it('Doing 1,000 complex queries', function (done) {

        var i     = 0,
            time  = 0,
            start = Date.now();

        for (i; i < 1000; i++) {
            __('If {{g donator male(he) female(she) }} only had given {{g receiver male(him) female(her) }} {{i data.flowers zero( flowers) one( flower) other( flowers)}} then they\'d lived happily ever after.', {
                donator: 'male',
                receiver: 'female',
                data: {flowers: 1}
            })
        }

        time = Date.now() - start;

        if (time > 100) throw new Error('Time to process 1,000 queries took over 100ms, it took: ' + time + 'ms')

        done()

    })

})
