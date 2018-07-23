const test = require('tape')

test('the first test', (assert) => {
    assert.plan(1)
    assert.equal(1+1, 2)

})

test('the second test', (assert) => {
    assert.plan(3)
    assert.equal(1, 1)
    assert.equal(2, 2)
    setTimeout(() => {
        assert.ok(true, 'true is ok, the final description')
    }, 2000)
})

test('the third test', (assert) => {
    assert.plan(1)
    assert.equal(1+5, 6)
})