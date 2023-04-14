const request = require('request-promise-native');

const nextISSTimesForMyLocation = function () {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(data => {
      const {response} = JSON.parse(data);
      return response;
    })
}


const fetchMyIP = function (callback) {
  return request('https://api.ipify.org?format=json');
 };

const fetchCoordsByIP = function(body){
  const ip = JSON.parse(body).ip;
  return request(`http://ipwho.is/${ip}`);
};

const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body);
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  return request(url);
};


 module.exports = {nextISSTimesForMyLocation}