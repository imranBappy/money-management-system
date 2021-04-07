const {Schema, model} = require('mongoose')

const TransactionSchema = new Schema({

    amount:{
        type: Number,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    note: String,
    author:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

}, {timestamps: true})

const Transaction = model('Transaction', TransactionSchema)

module.exports = Transaction 