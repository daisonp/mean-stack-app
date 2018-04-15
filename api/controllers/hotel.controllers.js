var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

/**
 * Get all hotels with query parameter filters
 * 
 * @param {Requset} req 
 * @param {Response} res 
 */
module.exports.hotelsGetAll = function(req, res) {
    console.log("Get all the hotels : ", req.query);
    var offset = 0;
    var count = 5;
    var maxCount = 10;

    if (req.query && req.query.lat && req.query.lng ) {
        runGeoQuery(req, res);
        return;
    }
 
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }

    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }

    if (isNaN(offset) || isNaN(count)) {
        res
          .status(400)
          .json({message : "If supplied in querystring count and offset should be numbers"})
        return;
    }

    if (count > maxCount) {
        res
          .status(400)
          .json({message : "Count limit of " +maxCount +" exceeded"})
        return;
    }

    Hotel
      .find()
      .skip(offset)
      .limit(count)
      .exec (function(err, hotels) {
        if (err) {
          console.log("Error finding hotels");
          res
            .status(500)
            .json(err);
        } else {
          console.log("found hotels", hotels.length);
          res
            .status(200)
            .json(hotels);
        }
      });    
};

/**
 * Get a single hotel based on the hotel id 
 * passed through as a path parameter
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
module.exports.hotelsGetOne = function(req, res) {
    var hotelId = req.params.hotelId;
    console.log("Get hotelId", hotelId);

    Hotel
      .findById( hotelId )
      .exec (function (err, hotel){
        var response = {
            status : 200,
            message : hotel
        };

        if (err) {
            response.status = 500;
            response.message = err;
        } else if (!hotel) {
            response.status = 404;
            response.message = {message : "Hotel ID not found"};
        }
        res
          .status (response.status)
          .json(response.message);
      }); 
};

/**
 * Add a single hotel using the data supplied as part
 * of the body of the request.
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
module.exports.hotelsAddOne = function(req, res) {
    console.log("POST new hotel");

    Hotel
        .create({
            name : req.body.name,
            description : req.body.description,
            stars : parseInt(req.body.stars,10),
            services : _splitArray(req.body.services),
            photos : _splitArray(req.body.photos),
            currency : req.body.currency,
            location : {
                address : req.body.address,
                coordinates : [parseFloat(req.body.lng), parseFloat(req.body.lat)]
            }
        }, function (err, hotel) {
            if (err) {
                console.log("Error creating hotel");
                res
                    .status(400)
                    .json(err);
            } else {
                console.log( "Hotel created", hotel );
                res
                    .status(201)
                    .json(hotel);
            }
        });
};

/**
 * Find hotels using spatial data
 * 
 * @param {Request} req 
 * @param {Response} response 
 */
function runGeoQuery (req, response) {
    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);

    var point = {
        type : "Point",
        coordinates : [lng, lat]
    };

    var geoOptions = {
        'near': point,
        'spherical': true,
        'distanceField': 'dist',
        'maxDistance': 2000
    };

    Hotel.aggregate(
        [ { '$geoNear': geoOptions } ],
        function(err, results) {
            console.log("Geo Results", results);
            response.status(200).json(results);
        }
    );
};

var _splitArray = function(input) {
    var output;
    if (input && input.length > 0) {
        output = input.split(";");
    } else {
        output = [];
    }
    return output;
}