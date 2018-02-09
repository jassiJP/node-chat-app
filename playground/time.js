//unix epic Jan 1, 1970 00:00:00 am <<- timestamp of 0
var moment = require('moment');

var date = moment();
// date.add(1, 'days');
// console.log(date.format('MMM Do, YYYY'));
console.log(date.format('h:mm a'));