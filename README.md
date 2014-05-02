This is Indonesian goverment civilian employee database scrapper. 

```
var bknScrapper = require("bkn-scrapper");
var bkn = new bknScrapper();
bkn.getData("<fill-with-goverment-id-number>", function(data) {
  // ...
});
```
