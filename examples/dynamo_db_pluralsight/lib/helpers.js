var bytes = require('utf8-length')

function prettyPrint(data) {
    var formatted = JSON.stringify(data, null, 4);
    console.log(formatted);
    if (data) {        
        console.log('Size of data:',jsonKB(data),'KB');        
    }
}

function jsonKB(data) {
    // Read operation
    if (data.Items)
        return (bytes(JSON.stringify(data.Items))/1024.0).toFixed(1);
    return (bytes(JSON.stringify(data))/1024.0).toFixed(1);

}

module.exports = {
    printPretty: prettyPrint,
    jsonKB: jsonKB
}