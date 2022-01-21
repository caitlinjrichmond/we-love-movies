const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
    const data = await reviewsService.list(req.params.movieId);
     res.json({data});
}


async function reviewExists(req, res, next) {
    const review = await reviewsService.read(req.params.reviewId);
    if (review) {
        res.locals.review = review;
        return next();
    }
    next({ status: 404, message: `Review cannot be found`});
}

async function update(req, res) {
    const updatedReview = {
        ...res.locals.review,
        ...req.body,
        review_id: res.locals.review.review_id,
    };

    const data = await reviewsService.update(updatedReview);
    

    res.json({ data });
}

async function destroy(req, res) {
    const { review } = res.locals;
    await reviewsService.delete(review.review_id);
    res.sendStatus(204);
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)]
};