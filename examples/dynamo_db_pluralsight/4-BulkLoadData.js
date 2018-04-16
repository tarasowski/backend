var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' })
var gen = require('./lib/generators')
var async = require('async');

var dynamodb = new AWS.DynamoDB();

// Generate data (100 Jobs and 100 Users)
var allData = gen.generateAllData(100, 100);

// SETUP WORKLOADS
var work = [].concat(
    function(done) { 
        var tableName = 'PL.Job';
        console.log('Generated', Object.keys(allData[tableName]).length, 'Jobs');
        processDataset(done, allData, tableName);
    },
    function(done) { 
        var tableName = 'PL.User';
        console.log('Generated', Object.keys(allData[tableName]).length, 'Users');
        processDataset(done, allData, tableName);
    },
    function(done) { 
        var tableName = 'PL.JobApplication';
        console.log('Generated', Object.keys(allData[tableName]).length, 'Job Applications');
        processDataset(done, allData, tableName);
    }
);
// END SETUP WORKLOADS

function startProcessingDataParallel() {
    async.parallel(work, function(err, data) {
        if (err)
            console.log('Unexpected Error: ', err, err.stack);
    });
}

function startProcessingDataSeries() {
    async.series(work, function(err, data) {
        if (err)
            console.log('Unexpected Error: ', err, err.stack);
    });
}

// startProcessingDataParallel();
startProcessingDataSeries();

function executeBatchPut(params) {
    var request = dynamodb.batchWriteItem(params);
    return request.promise();
}

function processDataset(done, allData, tableName, UnprocessedItems) {
    var params = buildParams();
    var requestItemCount = params.RequestItems[tableName].length;
    if (requestItemCount === 0) {
        done();
        return;
    }

    executeBatchPut(params)        
        .then(processBatchPutResponse)
        .catch(handleError)

    function processBatchPutResponse(response) {
        var request;

        if (!response.UnprocessedItems || !response.UnprocessedItems.length) {
            console.log('   Wrote', requestItemCount, 'items to table', tableName);
            processDataset(done, allData, tableName);            
            return;
        }
        
        var unprocessedCount = Object.keys(response.UnprocessedItems[tableName]).length;
        if (unprocessedCount > 0) {
            console.log('   Wrote', (requestItemCount - unprocessedCount), 'items to table', tableName, '(Unable to process',unprocessedCount,'items)');
            processDataset(done, allData, tableName, response.UnprocessedItems);
        }
    }

    function buildParams() {
        var dataSet = allData[tableName];
        var params = {
            RequestItems: {},
            "ReturnConsumedCapacity": "TOTAL"
        };
        params.RequestItems[tableName] = [];

        if (UnprocessedItems) {
            params.RequestItems = UnprocessedItems;
        }

        for (var id in dataSet) {
            if (params.RequestItems[tableName].length === 25)
                break;

            var request = {
                "PutRequest": {
                    "Item": dataSet[id]
                }
            };

            params.RequestItems[tableName].push(request);
            delete dataSet[id];
        }
        return params;
    }
    
    function handleError(err) {
        console.log('   Error:', err, err.stack);
        if (params.RequestItems[tableName].length !== 0) {
            processDataset(done, allData, tableName, params.RequestItems);
        }
    }

}


