const mongoose = require('mongoose')

const productSchema = new mongoose.Schema (
    {
        name: {type: String, required: true, unique: true},
        category: {type: String, required: true},
        brand:  {type: String, required: true},
        sex:  {type: String, required: true},
        price: {type: Number, required: true},
        salePrice:  {type: Number},
        imgUrls: [{ type: String }],
        sizes: [{
                size: { type: String},
                quantity: { type: Number}
            }]    
    },
    {
        timestamps: true
    }
)
const product = mongoose.model('product', productSchema)

module.exports = product;