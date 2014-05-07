/**
 * Module dependencies.
 */

var request = require ('superagent');
var cheerio = require ('cheerio');
var URL = 'http://www.bkn.go.id/in/pastikan-data-anda-benar.html';

/**
 * Parses html string into profile object
 *
 * @param {String} html string
 * @return {Object}
 * @api private
 */

function parse (html){
  var $ = cheerio.load(html);
  var next = false;
  var prev = '';
  var obj = {};
  $('td[valign="top"]').each(function(){
    var str = $(this).text().trim();
    if (str != ':' && str.length > 0) {
      next = false;
      if (!prev) {
        prev = str;
      } else {
        obj[prev] = str;
        prev = '';
      }
    } else if (str == ':') {
      next = true;
    }
  });
  return obj;
}


/**
 * Module exports
 *
 * Grab html from URL and send it to parse function
 *
 * @param {String} govt number 
 * @param {Function} optional, callback
 * @api public
 */

module.exports = function(number, cb){
  request
  .post(URL)
  .set('Content-type', 'application/x-www-form-urlencoded')
  .send({ id : number })
  .end(function(err, res){
    if (err) return cb(err);
    if (res.status != 200) return cb(new Error(res.status));
    cb(err, parse(res.text));
  });
}
