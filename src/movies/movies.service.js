const knex = require("../db/connection");

function list(is_showing) {
  // return knex("movies").select("*");
  if (!is_showing) {
    return knex("movies").select("*");
  } else {
    return knex("movies")
      .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
      .select("movies.*")
      .where({ "movies_theaters.is_showing": true })
      .groupBy("movies.movie_id");
  }
}

function read(movie_id) {
  return knex("movies").select("*").where({ movie_id }).first();
}

// function isShowing() {
//     return knex("movies_theaters").select("*").where({is_showing: true});
// }

module.exports = {
  list,
  read,
};
