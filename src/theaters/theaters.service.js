const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

// function list() {
//   return knex("theaters")
//     .select("*")
// }

// async function injectMovies(theater) {
//   theater.movie = await knex("movies")
//     .join("movies_theaters", "movies.movie_id", "movies.movie_id")
//     .select("*")
//     .where({ "movies_theater.theater_id": theater.theater_id })
//     .andWhere({ "movies_theaters.is_showing": true });
//   return theater;
// }

const reduceMovies = reduceProperties("theater_id", {
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  rating: ["movies", null, "rating"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  description: ["description", null, "description"],
  image_url: ["movies", null, "image_url"]
});

function list(movieId) {

  if (!movieId) {
  return knex("theaters")
    .join("movies_theaters", "theaters.theater_id", "movies_theaters.theater_id")
    .join("movies", "movies.movie_id", "movies_theaters.movie_id")
    .then(reduceMovies)
  } else {
    return knex("movies")
    .join("movies_theaters", "movies_theaters.movie_id", "movies.movie_id")
    .join("theaters", "theaters.theater_id", "movies_theaters.theater_id")
    .select("theaters.*")
    .groupBy("theaters.theater_id")
  }

    // for movies/id/theaters 
    // new function, fetch from movies table
    // .select("*")
    // .where({ movie_id: movieId })
    // .andWhere({ is_showing: true })

}
module.exports = {
  list,
  // read,
};
