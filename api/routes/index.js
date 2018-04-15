var express = require('express');
var router = express.Router();

var ctrlHotels = require('../controllers/hotel.controllers');
var ctrlReviews = require('../controllers/reviews.controllers');

router
  .route('/hotels')
  .get( ctrlHotels.hotelsGetAll )
  .post( ctrlHotels.hotelsAddOne );

router
  .route('/hotels/:hotelId')
  .get( ctrlHotels.hotelsGetOne );

router
  .route('/hotels/:hotelId/reviews')
  .get( ctrlReviews.reviewsGetAll )
  .post ( ctrlReviews.reviewsAddOne );


router
  .route('/hotels/:hotelId/reviews/:reviewId')
  .get( ctrlReviews.reviewsGetOne );


module.exports = router;