var request = require("request");
var cheerio = require("cheerio");

var URL = "http://www.bkn.go.id/profil-pns";

var bknScrapper = function() {
}

bknScrapper.prototype.getData = function(id, cb) {
  var form = {
    nip: id
  };

  request.post(URL, { form : form}, function(err, resp, body) {
    var data = {};
    if (!body) {
      return cb(null);
    }
    var $ = cheerio.load(body);
    var entry = $("div.pns-row");
    entry.each(function(i, e) {
      var key = $(e).find(".label").text(); 
      var value = $(e).find(".value").text(); 
      value = value.replace(": ", "");
      value = value.replace(/ {2,}/g, "");
      data[key] = value;
    });

    cb(data);
  }) 
}

module.exports = bknScrapper;
