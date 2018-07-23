const assert = require('assert')
const fs = require('fs')

assert.equal(1+2, 3)

const countLines = (cb) => {
    fs.readFile('file.txt', 'utf8', (err, src) => {
        if (err) cb(err)
        else cb(null, src.split('\n').length)
    })
}

countLines((err, n) => {
    assert.ifError(err)
    assert.equal(n, 3)
})