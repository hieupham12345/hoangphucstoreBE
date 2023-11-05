const userService = require('../services/userService')
const JwtService = require('../services/JwtService')

const createUser = async (req,res) => {
    try {
        const { fullName, phoneNumber, password, re_password, receiveNew, email } = req.body
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        const isCheckEmail = reg.test(email)
        if (!fullName || !phoneNumber || !password || !re_password || !receiveNew) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } else if (email !== "" && !isCheckEmail){
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is email'
            })
        } else if (password !== re_password) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The password is equal to confirm password'
            })
        }
        const response = await userService.createUser(req.body)
        return res.status(200).json(response)
    }
    catch (e) {
        return res.status(404).json({
            message: e.message
        })
    }
}

const loginUser = async (req,res) => {
    try {
        const { username, password  } = req.body

        if (!username) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'The input is required'
            })
        }else if (!password) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'The input is required'
            })}

        const response = await userService.loginUser(req.body)
        // const { refresh_token, ...newResponse } = response
        // res.cookie('refresh_token', refresh_token, {
        //     HttpOnly: true,
        //     Secure: false,
        //     samesite: 'strict',
        //     path: '/',
        // })
        return res.status(200).json(response)
    }
    catch (e) {
        return res.status(404).json({
            message: e.message 
        })
    }
}

const updateUser = async (req,res) => {
    try {
        const userID = req.params.id
        const data = req.body
        if (!userID) {
            return res.status(200).json({
                status: 'ERR',
                message: 'UserId is required'
            })
        }
        const response = await userService.updateUser(userID, data)
        return res.status(200).json(response)
    }
    catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteUser = async (req,res) => {
    try {
        const userID=req.params.id
        const token = req.headers

        if (!userID) {
            return res.status(200).json({
                status: 'ERR',
                message: 'UserId is required'
            })
        }
        const response = await userService.deleteUser(userID)
        return res.status(200).json(response)
    }
    catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllUser = async (req,res) => {
    try {
        const response = await userService.getAllUser()
        return res.status(200).json(response)
    }
    catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailUser = async (req,res) => {
    try {
        const userID = req.params.id
        if (!userID) {
            return res.status(200).json({
                status: 'ERR',
                message: 'UserId is required'
            })
        }
        const response = await userService.getDetailUser(userID)
        return res.status(200).json(response)
    }
    catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const refreshToken = async (req, res) => {
    try {
        let token = req.headers.token.split(' ')[1]
        if (!token) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The token is required'
            })
        }
        const response = await JwtService.refreshTokenJwtService(token)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e.message
        })
    }
}
module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailUser,
    refreshToken
}