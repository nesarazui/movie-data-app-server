/* Setting up Sequelize and connecting to the currently-running database process. {logging: false} turns off the output of SQL command text of each query made to the database (after calling .sync) */
const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/movie-data-app", {
  logging: false,
});

//Setting up schema for MovieRatings model
const MovieRatings = db.define("movieRatings", {
  imdbID: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
  title: { type: Sequelize.STRING },
  upRatings: { type: Sequelize.INTEGER, defaultValue: 0 },
  downRatings: { type: Sequelize.INTEGER, defaultValue: 0 },
});

module.exports = { db, MovieRatings };
