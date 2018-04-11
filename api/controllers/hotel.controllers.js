var hotelData = require('../data/hotel-data.json');
var dbconn = require('../data/dbconnection');
var ObjectId = require('mongodb').ObjectId;

module.exports.hotelsGetAll = function(req, res) {
    console.log("Get all the hotels");
    console.log(req.query);

    var db = dbconn.get().db('meantest');
    var collection = db.collection('hotels'); 

    var offset = 0;
    var count = 5;

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }

    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }

    collection
      .find()
      .skip(offset)
      .limit(count)
      .toArray(function(err, docs) {
        console.log("found hotels");
        res
          .status(200)
          .json(docs);
      });
    
};

module.exports.hotelsGetOne = function(req, res) {
    var hotelId = req.params.hotelId;
    console.log("Get hotelId", hotelId);

    var db = dbconn.get().db('meantest');
    var collection = db.collection('hotels');
    
    collection
      .findOne( { _id : ObjectId(hotelId) }, function(err, doc) {
          console.log("found hotel");
          res
            .status(200)
            .json(doc);
        }
    );
};

module.exports.hotelsAddOne = function(req, res) {
    var db = dbconn.get().db('meantest');
    var collection = db.collection('hotels'); 

    console.log("POST new hotel");

    if (req.body && req.body.name && req.body.stars ) {
        var newHotel = req.body;
        newHotel.stars = parseInt(req.body.stars, 10);
        
        collection
          .insertOne (newHotel, function(err, response) {
            console.log( response.ops );
            res
              .status(201)
              .json(response.ops);
          }); 
        
    } else {
        console.log("Data missing from body");
        res
          .status(400)
          .json( { message : "Required data missing from body" } );
    }
  
};