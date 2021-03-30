import mongoose from 'mongoose';
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
        trim: true
    },
    is18Plus: {
        type: Boolean,
        required: true
    },
    balance: Number,
    income: Number,
    transaction: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Transaction'
        }]
    }
})


const User = mongoose.model('User', userSchema)

module.exports = User