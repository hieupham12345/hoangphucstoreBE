const user = require('../models/userModel')
const bcrypt = require('bcrypt')
const { generalAccessToken, generalRefreshToken } = require('./JwtService')

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { fullName, phoneNumber, password, receiveNew, email } = newUser

        try {
            const checkUser = await user.findOne({
                phoneNumber: phoneNumber
            })

            if (checkUser !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The phone number is already'
                })
            } else {
                const hash = bcrypt.hashSync(password, 10)
                const createdUser = await user.create({
                    fullName,
                    phoneNumber,
                    password: hash,
                    receiveNew,
                    email
                })

                if (createdUser) {
                    resolve({
                        status: 'OK',
                        message: 'SUCCESS',
                        data: createdUser
                    })
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { username, password } = userLogin

        try {
            const checkUser = await user.findOne({
                email: username
            })
            const checkPhone = await user.findOne({
                phoneNumber: username
            })
            if (checkUser === null && checkPhone === null) {
                resolve ({
                    status: 'ERROR',
                    message: 'The user is not defined'
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser ? checkUser.password : checkPhone.password)

            if (!comparePassword) {
                resolve ({
                    status: 'ERROR',
                    message: 'The password or username is incorrect'
                })
            }

            const access_token = await generalAccessToken({
                id: checkPhone ? checkPhone.id : checkUser.id,
                isAdmin: checkPhone ? checkPhone.isAdmin : checkUser.isAdmin
            })

            const refresh_token = await generalRefreshToken({
                id: checkPhone ? checkPhone.id : checkUser.id,
                isAdmin: checkPhone ? checkPhone.isAdmin : checkUser.isAdmin
            })

            resolve ({
                status: 'OK',
                message: 'success',
                access_token,
                refresh_token
            })
        }
        catch(e) {
            reject(e)
        }
    })
} 

const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUserID = await user.findOne({
                _id: id
            })
            if (checkUserID === null) {
                resolve ({
                    status: 'OK',
                    message: 'The user is not defined'
                })
            }
            const updatedUser = await user.findByIdAndUpdate(id, data, {new: true})
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                updatedUser
            })
        }
        catch(e) {
            reject(e)
        }
    })
} 

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUserID = await user.findOne({
                _id: id
            })
            if (checkUserID === null) {
                resolve ({
                    status: 'OK',
                    message: 'The user is not defined'
                })
            }
            await user.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete user successfully'
            })
        }
        catch(e) {
            reject(e)
        }
    })
} 

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {

            const allUser = await user.find()
            resolve({
                status: 'OK',
                message: 'success',
                data: allUser
            })
        }
        catch(e) {
            reject(e)
        }
    })
} 

const getDetailUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUserID = await user.findOne({
                _id: id
            })
            if (checkUserID === null) {
                resolve ({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }
            resolve({
                status: 'OK ',
                message: 'Success',
                data: checkUserID
            })
        }
        catch(e) {
            reject(e)
        }
    })
} 

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailUser
}