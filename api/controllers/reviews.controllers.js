var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

module.exports.reviewsGetAll = function(req, res) {
    var hotelId = req.params.hotelId;
    console.log("Get hotelId", hotelId);

    Hotel
    .findById( hotelId )
    .select ( 'reviews' )
    .exec (function (err, hotel){
      var response = {
        status : 200,
        message : {}
      }
      if (err) {
        console.log("Error finding hotel");
        response.status = 500;
        response.message = err;
      } else if (!hotel) {
        console.log("Hotel id not found in database", hotelId);
        reponse.status = 404;
        response.message = {message : "Hotel ID not found " + id};
      } else {
        response.message = doc.reviews ? doc.reviews : [];
      }
      res
        .status(response.status)
        .json( response.message );
    }); 
};

module.exports.reviewsGetOne = function(req, res) {
    var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;

    console.log("Get hotelId", hotelId, "Get review id", reviewId);

    Hotel
      .findById( hotelId )
      .select ( 'reviews' )
      .exec (function (err, hotel){
        console.log("found review", hotel);
        var review = hotel.reviews.id(reviewId);
        res
          .status(200)
          .json( review );
      }); 
};

module.exports.reviewsAddOne = function(req, res) {
  var hotelId = req.params.hotelId;

  Hotel
      .findById( hotelId )
      .select ( 'reviews' )
      .exec (function (err, hotel){
        var response = {
          status : 200,
          message : {}
        }
        if (err) {
          console.log("Error finding hotel");
          response.status = 500;
          response.message = err;
        } else if (!hotel) {
          console.log("Hotel id not found in database", hotelId);
          reponse.status = 404;
          response.message = {message : "Hotel ID not found " + id};
        } 

        if (hotel) {
          _addReview(req, res, hotel);
        } else {
          res
            .status(response.status)
            .json( response.message );
        }
      }); 
};

var _addReview = function(eq, res, hotel) {

};