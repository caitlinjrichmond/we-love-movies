const knex = require("../db/connection");

function read(review_id) {
  return knex("reviews").select("*").where({ review_id }).first();
}

function readCritics(criticId) {
  return knex("critics").select("*").where({ critic_id: criticId }).first();
}

function list(movieId) {
  return knex("reviews")
    .select("*")
    .where({ movie_id: movieId })
    .then((reviews) => Promise.all(reviews.map(injectCritics)))
}

async function injectCritics(review) {
  review.critic = await readCritics(review.critic_id);
  return review;
  
  
  // knex("critics").select("*").where({critic_id: review.critic_id}).first()
  // return review;
}

// function list(movieId) {
//   return knex("reviews")
//     .select("*")
//     .where({ movie_id: movieId })
// }

function update(updatedReview) {
  return knex("reviews")
    .where({ review_id: updatedReview.review_id }) 
    .update(updatedReview, "*")
    .then(() => read(updatedReview.review_id))
    .then((review) => injectCritics(review))

}

function destroy(review_id) {
  return knex("reviews").where({ review_id }).del();
}

module.exports = {
  list,
  read,
  update,
  delete: destroy,
};
