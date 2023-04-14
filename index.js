// index.js
const { nextISSTimesForMyLocation } = require('./iss');


const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printPassTimes(passTimes);
});


// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   // console.log('It worked! Returned IP:', ip);
  
//   fetchCoordsByIP('24.85.226.88', (error, coordinates) => {
//   if(error) {
//     console.log("It didn't work!", error);
//     return
//     }
    
//     // console.log('It worked! Returned coordinates:', coordinates)
//   });
// });

// const myCoords = { latitude: '49.2827291', longitude: '-123.1207375' };

// fetchISSFlyOverTimes(myCoords, (error, passTimes) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   // console.log('It worked! Returned flyover times:' , passTimes);
// });
// if (error) {
//   return console.log("It didn't work!", error);
// }
// // success, print out the deets!
// console.log(passTimes);

