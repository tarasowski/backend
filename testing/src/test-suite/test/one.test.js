const test = require('tape')
const elevenizer = require('../') // require the parent directory

test('single digits', (assert) => {
    assert.plan(2)
    elevenizer(1, (err, number) => {
        assert.error(err, `shouldn't throw an error`) // assert.error()
        assert.equal(number, 111, 'should equal to 111')
    })
})