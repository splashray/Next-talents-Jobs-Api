const { StatusCodes } = require("http-status-codes");
const paginateResults = (model) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const options = {
      page,
      limit,
    };

    try {
      const { docs, totalDocs, hasNextPage, hasPrevPage, nextPage, prevPage } =
        await model.paginate({}, options);
      res.paginatedResults = {
        totalDocs,
        hasNextPage,
        hasPrevPage,
        nextPage,
        prevPage,
        results: docs,
      };
      next();
    } catch (err) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: err.message });
    }
  };
};

module.exports = paginateResults;
