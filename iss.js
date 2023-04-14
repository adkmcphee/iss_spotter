const request = require('request');

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(coords, (error, flyover) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, flyover);
      });
    });
  });
};

const fetchMyIP = function(callback) {

  request('https://api.ipify.org?format=json	', function(error, response, body) {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);


  });
  // use request to fetch IP address from JSON API
};

const fetchCoordsByIP = function(ip, callback) {
  request(`http://ipwho.is/${ip}`, function(error, response, body) {
    if (error) {
      callback(error, null);
      return;
    }

    const parsedData = JSON.parse(body);

    if (!parsedData.success) {
      const msg = `Success status was ${parsedData.success}. Server message says: ${parsedData.message} when fetching for IP ${parsedData.ip}`;
      callback(Error(msg), null);
      return;
    }

    const coordinates = { latitude: parsedData.latitude, longitude: parsedData.longitude };

    callback(null, coordinates);

  });
};


const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, function(error, response, body) {

    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }
    const passes = JSON.parse(body).response;
    callback(null, passes);

  });
};



module.exports = { nextISSTimesForMyLocation };