const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
    const movie = await moviesService.read(req.params.movieId);
    if (movie) {
        res.locals.movie = movie;
        return next();
    }
    next({ status: 404, message: `Movie cannot be found.` });
}

function read(req, res) {
    const { movie: data } = res.locals;
    res.json({ data });
}

async function list(req, res, next) {
    const data = await moviesService.list(req.query.is_showing);
    res.json({ data });
}

// async function movieIsShowing(req, res) {
//     const data = await moviesService.isShowing();
//     res.json({ data });
// }

module.exports = {
    read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
    list: asyncErrorBoundary(list),
};