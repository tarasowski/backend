const test = require('tape')
const elevenizer = require('../') // require the parent directory

test('double digits', (assert) => {
    assert.plan(2)
    elevenizer(20, (err, number) => {
        assert.error(err, `shouldn't throw an error`) // assert.error()
        assert.equal(number, 2220, 'should equal to 2220')
    })
})