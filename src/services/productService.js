const product = require('../models/productModel')

const createProduct = (newProduct) => {
    return new Promise( async (resolve, reject) => {
        const {name, category, brand, sex, price, salePrice, imgUrls, sizes } = newProduct
        try {
            const newProduct = await product.create ({
                name, 
                category, 
                brand, 
                sex, 
                price, 
                salePrice, 
                imgUrls, 
                sizes
            })
            if (newProduct) {
                resolve ({
                    status: 'OK',
                    message: 'Success',
                    newProduct
                })
            }
        } catch (e) {
            reject ({
                message: e.message
            })
        }      
    })
}

const getProduct = (productID) => {
    return new Promise( async (resolve, reject) => {
        try {
            const checkProduct = await product.findOne({
                _id: productID 
            }) 
            if (checkProduct) {
                resolve ({
                    status: 'OK',
                    message: 'Success',
                    checkProduct
                })
            } else {
                resolve ({
                    status: 'ERR',
                    message: 'Product is not defined'
                })
            }
        } catch (e) {
            reject ({
                message: e.message
            })
        }      
    })
}

const updateProduct = (productID, data) => {
    return new Promise( async (resolve, reject) => {
        try {
            const checkProduct = await product.findOne({
                _id: productID
            })
            if (!checkProduct) {
                resolve ({
                    status: 'ERR',
                    message: 'Product is not defined'
                })
            }
            const updatedProduct = await product.findByIdAndUpdate(productID, data, {new: true})
            resolve ({
                status: 'OK',
                message: 'Success',
                updatedProduct
            })
            } catch (e) {
            reject ({
                message: e.message
            })
        }      
    })
}

const deleteProduct = (productID) => {
    return new Promise( async (resolve, reject) => {
        try {
            const checkProduct = await product.findOne({
                _id: productID
            })
            if (!checkProduct) {
                resolve ({
                    status: 'ERR',
                    message: 'Product is not defined'
                })
            }
            await product.findByIdAndDelete(productID)
            resolve ({
                status: 'OK',
                message: 'Success',
            })
            } catch (e) {
            reject ({
                message: e.message
            })
        }      
    })
}

const getAllProduct = (limit, page, sort, filter) => {
    return new Promise( async (resolve, reject) => {
        try {
            const totalProduct = await product.count()
            if (filter) {
                const label = filter[0]

                const regex = new RegExp(filter[1], 'i');
                const AllproductFilter = await product.find({ [label]: { $regex: regex } }).limit(limit || 8).skip((limit * page) || 0);
                            
                resolve ({
                        status: 'OK',
                        message: 'Success',
                        data: AllproductFilter,
                        total: totalProduct,
                        pageCurrent: Number(Number(page) + 1),
                        totalPage: Math.ceil(totalProduct / limit)
                })}
            if (sort) {
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                const AllproductSort = await product.find().limit(limit || 8).skip(limit*page || 0).sort(objectSort)
            
                resolve ({
                        status: 'OK',
                        message: 'Success',
                        data: AllproductSort,
                        total: totalProduct,
                        pageCurrent: Number(Number(page) + 1),
                        totalPage: Math.ceil(totalProduct / limit)
                })}
            const allProduct =  await product.find().limit(limit).skip(limit*page)
            resolve ({
                        status: 'OK',
                        message: 'Success',
                        data: allProduct,
                        total: totalProduct,
                        pageCurrent: Number(Number(page) + 1),
                        totalPage: Math.ceil(totalProduct / limit)
                })
            }
            catch (e) {
            reject ({
                message: e.message
            })
        }      
    })
}

module.exports = {
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    getAllProduct
}   