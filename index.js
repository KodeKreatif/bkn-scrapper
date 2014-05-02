var request = require("request");
var Parser = require("parse5").Parser;
var parser = new Parser();

var URL = "http://www.bkn.go.id/in/pastikan-data-anda-benar.html";

var bknScrapper = function() {
}

bknScrapper.prototype.getData = function(id, cb) {
  var form = {
    id: id
  };

  var traverse = function(find, node, cb) {
    if (!node.childNodes || node.childNodes.length == 0) {
      return false;
    }
    if (node.nodeName == find) {
      cb(node);
    }

    for (var i = 0; i < node.childNodes.length; i ++) {
      traverse(find, node.childNodes[i], cb);
    }
    return false;
  }

  request.post(URL, { form : form}, function(err, resp, body) {
    var doc = parser.parse(body);
    var level = 0;
    var node = doc;
    var data = {};
    traverse("tbody", node, function(tbody) {
      traverse("tr", tbody, function(tr) {
        if (tr.childNodes) {
          var key, value;
          tr.childNodes.forEach(function(td) {
            if (td.childNodes && td.childNodes.length > 0) {
              if (td.childNodes[0].nodeName == "b") {
                var b = td.childNodes[0];
                key = b.childNodes[0].value;
              } else if (td.childNodes[0].nodeName == "#text") {
                value = td.childNodes[0].value;
              }
            }
          });
          if (key) {
            data[key] = value;
          }
        }
      })
    });
    cb(data);
  }) 
}

module.exports = bknScrapper;
