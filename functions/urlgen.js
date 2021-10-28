
// This is your new function. To start, set the name and path on the left.

exports.handler = function(context, event, callback) {
  //const Analytics = require('analytics-node');
  //const analytics = new Analytics('vHg3IX68uF3Ftnh1evMzEuj5I7zufV24',{ flushAt: 1 });

  // Here's an example of setting up some TWiML to respond to with this function
	let twiml = new Twilio.twiml.MessagingResponse();
  let stream = "ankit";
  let urlBase = 'https://segment-test-3208.twil.io/index.html';
  twiml.message(' Use this link to access Sizzle Web: ')
  twiml.message(`${urlBase}?phone=${event.From.substring(1)}&stream=${stream}`);
  
  //console.log(`${urlBase}?phone=${event.From}&stream=${stream}`);
  //twiml.message('By accessing this site, you agree to receive additional text messages. Reply STOP to opt out.')

  //analytics.identify(`${event.From.substring(1)}`);
  //analytics.track('urlGen',{userId: '18009991212'});


  // You can log with console.log
  //console.log('error', variable);

  // This callback is what is returned in response to this function being invoked.
  // It's really important! E.g. you might respond with TWiML here for a voice or SMS response.
  // Or you might return JSON data to a studio flow. Don't forget it!
  return callback(null, twiml);
};