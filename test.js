var profileOf = require ('./');

var validId = ''; //fill it with valid `pns` id
var invalidId = ''; //fill it with invalid `pns` id

describe ('BKN', function(){
  it('should get a valid profile', function(done){
    profileOf (validId, function(err, obj) {
      if (err) return done(err);
      Object.keys(obj).length.should.above(0);
      done(); 
    });
  });

  it('should return an empty object', function(done){
    profileOf (invalidId, function(err, obj) {
      if (err) return done(err);
      Object.keys(obj).length.should.equal(0);
      done();
    });
  });
});

