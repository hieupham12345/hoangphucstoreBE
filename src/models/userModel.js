const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
    {
        fullName: {type: String, required: true},
        phoneNumber: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        receiveNew: {type: Boolean, required: true},
        email: {type: String, unique: false},
        isAdmin: {type: Boolean, default: false, required: true},
        access_token: {type: String, require: true},
        refesh_token: {type: String, require: true},
        address_list: [{
            fullName: {type: String, required: true},
            gender: {type: String},
            phoneNumber: {type: String, required: true},
            address: {type: String, required: true},
            isDefault: {type: Boolean, required: true}
        }]
    },
    {
        timestamps: true
    }
)
const user = mongoose.model("user", userSchema);
module.exports = user;