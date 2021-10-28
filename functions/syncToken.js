exports.handler = function(context, event, callback) {  
  const ACCOUNT_SID = context.ACCOUNT_SID;
  const API_KEY = context.API_KEY;
  const API_SECRET = context.API_SECRET;
  
  const response = new Twilio.Response();
  
  response.appendHeader('Access-Control-Allow-Origin', '*');
  response.appendHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');
  response.appendHeader('Content-Type', 'application/json');

  const IDENTITY = 'magic_user';

  const AccessToken = Twilio.jwt.AccessToken;
  const SyncGrant = AccessToken.SyncGrant;

  const syncGrant = new SyncGrant({
    serviceSid: 'IS79aa902e973bf0bb625b8c4cf77737c2'
  });

  const accessToken = new AccessToken(
    ACCOUNT_SID,
    API_KEY,
    API_SECRET
  );

  accessToken.addGrant(syncGrant);
  accessToken.identity = IDENTITY;
  
  response.setBody({ 
    token: accessToken.toJwt()
  });

  callback(null, response);
}