const express = require("express");
const { MovieRatings } = require("../models");
const router = express.Router();

/* GET Request. Retrieving all records from MovieRatings table */
router.get("/", async (req, res, next) => {
  try {
    let movieRecords = await MovieRatings.findAll();
    if (movieRecords) {
      res.send(movieRecords);
    } else {
      res.sendStatus("Not Found");
    }
  } catch (error) {
    next(error);
  }
});

/* POST Request. Adds incoming data from the client into the MovieRatings table. The Sequelize 'findOrCreate' finder method searches the MovieRatings table by imdbID, returning a promise for an array.
The first element in the array is the instance. The second, which is not being used, is a boolean (true = instance was not found, and has now been created  OR false = instance was already there). 
The instance is then updated by incrementing the value in the appropriate column (upRatings or downRatings) by one.*/
router.post("/", async (req, res, next) => {
  try {
    const { selectedMovie, ratingType } = req.body;
    const [instance] = await MovieRatings.findOrCreate({
      where: { imdbID: selectedMovie.imdbID },
      defaults: { title: selectedMovie.Title },
    });
    let previousVal = instance[ratingType];
    await instance.update({ [ratingType]: previousVal + 1 });

    if (instance) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
