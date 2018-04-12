'use strict'; 

// Load environment variables
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const recaptchaSecret = process.env.GOOGLE_RECAPTCHA_TOKEN;

// Setup dependencies
const request = require('request');
const twilioClient = require('twilio')(twilioAccountSid, twilioAuthToken);

// Required in responses for CORS support to work
const headers = {'Access-Control-Allow-Origin': '*'};

module.exports.validateAndSend = (event, context, callback) => {
  
  const validationData = {
    url: 'https://www.google.com/recaptcha/api/siteverify?secret=' + 
      recaptchaSecret + "&response=" + event.body.captcha,
    method: 'POST',
  };

  request(validationData, function(error, response, body) {
    const parsedBody = JSON.parse(body)

    if (error || response.statusCode !== 200){

      const recaptchaErrResponse = {
        headers: headers,
        statusCode: 500,
        body: JSON.stringify({
          status: 'fail',
          message: 'Error attempting to validate recaptcha.',
          error: error || response.statusCode
        }),
      };

      return callback(null, recaptchaErrResponse);
    } else if (parsedBody.success === false) {
      
      const recaptchaFailedErrResponse = {
        headers: headers,
        statusCode: 200,
        body: JSON.stringify({
          status: 'fail',
          message: 'Captcha validation failed. Refresh the page & try again!',
        })
      };
      
      return callback(null, recaptchaFailedErrResponse);
    } else if (parsedBody.success === true) {
      
      // Try to actually send the message
      const sms = {
        to: event.body.to,
        body: event.body.message || '',
        from: twilioPhoneNumber,
      };

      twilioClient.messages.create(sms, (error, data) => {
        if (error) {

          const twilioErrResponse = {
            headers: headers,
            statusCode: 200,
            body: JSON.stringify({
              status: 'fail',
              message: error.message,
              error: error
            })
          };

          return callback(null, twilioErrResponse);
        }
        // If no errors: Return success response!
        
        const successResponse = {
          headers: headers,
          statusCode: 200,
          body: JSON.stringify({
            status: 'success',
            message: 'Text message successfully sent!',
            body: data.body,
            created: data.dateCreated
          })
        };

        callback(null, successResponse);
      });
    }
  })
};
