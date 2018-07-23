module.exports = (n, cb) => {
    setTimeout(() => {
        cb(null, n * 111)
    })
}