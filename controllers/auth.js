const user = require('../models/user')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res) => {
    try {
        const USER = await user.create({ ...req.body })
        const token = USER.createJwt()
        res.status(StatusCodes.CREATED).json({USER})
    } catch (error) {
        console.log(error);
    }
}
module.exports = {register}