const productService = require('../services/productService')

const createProduct = async (req, res) => {
    try {
        const {name, category, brand, sex, price, salePrice, imgUrls, sizes } = req.body
        if (!name  || !category || !brand || !sex || !price || !salePrice || !imgUrls || !sizes ) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await productService.createProduct(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json ({
            message: e.message
        })
    }
}

const getProduct = async (req, res) => {
    try {
        const productID = req.params.id
        if (!productID) {
            return res.status(200).json({
                status: 'ERR',
                message: 'ProductID is required'
            })
        }
        const response = await productService.getProduct(productID)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json ({
            message: e.message
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const productID = req.params.id
        const data = req.body
        if (!productID) {
            return res.status(200).json({
                status: 'ERR',
                message: 'ProductID is required'
            })
        }
        const response = await productService.updateProduct(productID, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json ({
            message: e.message
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productID = req.params.id
        if (!productID) {
            return res.status(200).json({
                status: 'ERR',
                message: 'ProductID is required'
            })
        }
        const response = await productService.deleteProduct(productID)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json ({
            message: e.message
        })
    }
}

const getAllProduct = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        const response = await productService.getAllProduct(limit, page, sort, filter)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json ({
            message: e.message
        })
    }
}

module.exports = {
    createProduct,
    getProduct,
    updateProduct,  
    deleteProduct,
    getAllProduct
}