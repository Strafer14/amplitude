let request = require('superagent');

class Amplitude {
  constructor(token) {
    this.token = token;

    _checkForToken(token);
  }

  track(data, cb) {
    _postToApi(this.token, data, cb);
  }
}

function _checkForToken(token) {
  if(!token) { throw 'No token provided'; }
}

function _postToApi(token, data, cb) {
  request
    .post('https://api.amplitude.com/httpapi')
    .query({
      api_key: token,
      event: JSON.stringify(data)
    })
    .set('Accept', 'application/json')
    .end(function(err, res){
      if (err) {
        console.error('There was a problem tracking "' + data.event_type + '" for "' + data.user_id + '"; ' + err);
      }
      cb();
    });
}

exports.Amplitude = Amplitude;