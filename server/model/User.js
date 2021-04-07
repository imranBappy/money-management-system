const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    amount: Number,
    income: Number,
    expense: Number,
    transaction: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Transaction'
        }]
    },
    date: {
        type: Date,
        default: Date.now
      }
})


const User = mongoose.model('User', userSchema)

module.exports = User