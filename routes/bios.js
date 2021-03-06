var express = require('express');
var router = express.Router();
var mongo = require('../data/mongo');

/* GET a specific bio by ID */
router.get('/:id', function(req, res, next) {
  var results = mongo.bios.find({'_id': parseInt(req.params.id)}).limit(1); //cursor of results
  var array = results.toArray(function(err, arr) {
    var doc = arr[0];
    res.json(doc);
  });
});

router.put('/award/:id', function(req, res, next) {
  console.log(req.body);
  var results = mongo.bios.update({'_id': parseInt(req.params.id)}, {'$push':{'awards':req.body.award}}, false, false);
  res.json(results);
});

router.post('/:id/:firstName/:lastName', function(req, res, next) {
  var results = mongo.bios.insert({'_id': parseInt(req.params.id),
                                  'name': {'first':req.params.firstName,'last':req.params.lastName}});


  res.json(results);
});

router.delete('/:id', function(req, res, next) {
  var results = mongo.bios.remove({'_id': parseInt(req.params.id)}, {justOne: true});

  res.json(results);
});

module.exports = router;
