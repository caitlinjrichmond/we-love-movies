const theatersService = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


// async function list(req, res, next) {
//     const data = await theatersService.list();
//     res.json({ data });
// }

async function list(req, res, next) {
    const data = await theatersService.list(req.params.movieId);
     res.json({data});
}

module.exports = {
    list: asyncErrorBoundary(list),
    // read: asyncErrorBoundary(read),
    
};