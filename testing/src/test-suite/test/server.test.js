const test = require('tape')
const http = require('http')
const concat = require('concat-stream')
const elevenizer = require('../')

let server

test('setup', (assert) => {
   server = http.createServer((req, res) => {
       const n = req.url.slice(1)
       elevenizer(n, (err, result) => {
           if (err) {
               res.statusCode = 400
               res.end(err)
           } else res.end(String(result))
       })
   })
   server.listen(0, () => {
       assert.end()
   })
})

test('single digits', (assert) => {
    assert.plan(6) // two tests per assertion
    
    const testDigit = (n, expected) => {
        const req = http.request({
        host: 'localhost',
        port: server.address().port,
        path: '/' + n
    }, (res) => {
        assert.equal(res.statusCode, 200)
        res.pipe(concat((body) => {
            assert.equal(Number(body.toString()), expected)
        }))
    })
    req.end()
}
    
    testDigit(1, 111)
    testDigit(2, 222)
    testDigit(3, 333)
})

test('teardown', (assert) => {
    server.close(() => {
        assert.end()
    })
})