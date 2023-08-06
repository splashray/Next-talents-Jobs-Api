const { StatusCodes } = require("http-status-codes");

const handlePaginatedResults = (res, fallbackDataKey, fallbackQuery) => {
  if (res.paginatedResults) {
    const { totalDocs, hasNextPage, hasPrevPage, nextPage, prevPage, results } =
      res.paginatedResults;
    const response = {
      totalDocs,
      hasNextPage,
      hasPrevPage,
      nextPage,
      prevPage,
      [fallbackDataKey]: results,
    };
    res.status(StatusCodes.OK).json(response);
  } else {
    fallbackQuery();
  }
};

module.exports = handlePaginatedResults;
