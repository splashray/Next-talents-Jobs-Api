const { StatusCodes } = require('http-status-codes')
const {valiationError} = require('mongoose')
const {CustomAPIError} = require('../errors/custom-api')
const errorHandlerMiddleware = (error, req, res, next) => {
  // let customError = {
  //   // set default
  //   statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  //   msg: err.message || 'Something went wrong try again later',
  // }
  
  if (error instanceof CustomAPIError) {
    return res.status(error.statusCode).json({ msg: error.message })
    }
    if (error instanceof ValidationError) {
      // Handle mongoose validation errors
      const errors = Object.values(err.errors).map((error) => error.message);
      return res.status(StatusCodes.BAD_REQUEST).json({ message: errors });
    }
//     if (err.name === 'ValidationError') {
//       customError.msg = Object.values(err.errors)
//       .map((item) => item.message)
//       .join(',')
//       customError.statusCode = 400
//     }
//     if (err.code && err.code === 11000) {
//       customError.msg = `Duplicate value entered for ${Object.keys(
//         err.keyValue
//         )} field, please choose another value`
//     customError.statusCode = 400
//   }
//   if (err.name === 'CastError') {
//     customError.msg = `No item found with id : ${err.value}`
//     customError.statusCode = 404
//   }

//   return res.status(customError.statusCode).json({ msg: customError.msg })
next(error);
}

module.exports = {errorHandlerMiddleware}
