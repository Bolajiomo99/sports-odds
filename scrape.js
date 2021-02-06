const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const getJSON = function(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      const status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};



getJSON('https://api.gambitprofit.com/gambit-plays?_sort=PlayDate:DESC',
function(err, data) {
  if (err !== null) {
    console.log('Something went wrong: ' + err);
  } else {
    console.log('Your query count: ' +  data);
  }
});

