'use strict';

module.exports.sendReminderDaily = (event, context, callback) => {
    
    var AWS = require('aws-sdk'); // aws sdk that contain all APIs to the AWS services
    AWS.config.update({region:'eu-west-1'}); // configuration of the location
    var ses = new AWS.SES(); // a SES client for sending emails
    var fs = require('fs'); 

    var emailHtml = fs.readFileSync('./dailyReminder.html', 'utf-8');

    var toAndFromAdress = 'dimitri@tarasowski.de'
    var params = { // this params we are going to pass to SES service to send emails
        Destination: {
            ToAddresses: [toAndFromAdress]
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8", 
                    Data: emailHtml
                }, 
                Text: {
                    Charset: "UTF-8", 
                    Data: "Remember to continue helping the Woof Garden in your Pluralsight course!"
                }
            }, 
            Subject: {
                Charset: "UTF-8", 
                Data: "Woof Garden Reminder"
            }
        },
        ReplyToAddresses: [toAndFromAdress],
        Source: toAndFromAdress, 
    };

    ses.sendEmail(params, function(err, data) {
        // an error occurred
        if (err) console.log(err, err.stack); 
        // successful response
        else callback(null, data);
    }); 
};

module.exports.sendReminderWeekend = (event, context, callback) => {
    
    var AWS = require('aws-sdk');
    AWS.config.update({region:'eu-west-1'});
    var ses = new AWS.SES();
    var fs = require('fs');

    var emailHtml = fs.readFileSync('./weekendReminder.html', 'utf-8');

    var toAndFromAdress = 'dimitri@tarasowski.de'
    var params = {
        Destination: {
            ToAddresses: [toAndFromAdress]
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8", 
                    Data: emailHtml
                }, 
                Text: {
                    Charset: "UTF-8", 
                    Data: "Here's a weekend Remember that puppies are adorable!!"
                }
            }, 
            Subject: {
                Charset: "UTF-8", 
                Data: "Woof Garden Reminder"
            }
        },
        ReplyToAddresses: [toAndFromAdress],
        Source: toAndFromAdress, 
    };

    ses.sendEmail(params, function(err, data) {
        // an error occurred
        if (err) console.log(err, err.stack); 
        // successful response
        else callback(null, data);
    }); 
};