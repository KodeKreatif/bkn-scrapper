# bkn scrapper

This is Indonesian goverment civilian employee database scrapper.

# example

```js
var profileOf = require ('bkn-cheerio');
profileOf ('<fill-with-goverment-id-number>', function(err, obj) {
  if (err) return done(err);
  console.log (JSON.stringify(obj, null, 2));
});
```
