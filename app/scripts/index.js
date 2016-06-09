
var _ = require('underscore');

var handlebars = require('handlebars');

var $ = require('jQuery');






var url = 'https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=yarn&includes=Images,Shop';

fetchJSONP(url, start);

function start(data){
  console.log('network request done');
//console.log(data.results);

  var tilesList = data.results;
  console.log(tilesList);

  var totalTiles = tilesList.length;
  console.log(totalTiles)

  var source = $('#tiles').html();
  var template =handlebars.compile(source);

  /*****causing error of title undefined (improper path to key:value?)
  MDN: A variable that has not been assigned a value is of type undefined. A method or statement also returns undefined if the variable that is being evaluated does not have an assigned value. A function returns undefined if a value was not returned.
  (using [0] as a test to select the first object in array; doesn't matter if variable name or
  data.results is used; need to figure out how to get outside of this function)

  var context = {
    'title':  data.results[0]['shop']['title'],
    'shop_name': tilesList[0]['shop']['shop_name'],
    'price': tilesList[0]['price']
  }

*/
  //var renderTemplate = template(context);

}







/*
  (url: String, callback: Function) -> undefined

  Execute a callback function with the JSON results from the url specified.

  Examples
      var url = "https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=tacos&includes=Images,Shop";

      fetchJSONP(url, function(data) {
        // do something with data
      });

      // OR
 `1               q``1    1`1 qA  ` Q1` aq  z12QW cxzAQEWRW1``
      function logData(data) {
        console.log(data);
      }

      fetchJSONP(url, logData);
*/
function fetchJSONP(url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    var script = document.createElement('script');

    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}
