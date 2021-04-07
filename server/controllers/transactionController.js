const Transaction = require('../model/Transactions')
const { serverError } = require('../util/error')
const User = require('../model/User')


// Transaction Post Controller
exports.create = async(req, res) =>{
    const {amount, note, type} = req.body
    const userId = req.user._id

    const newTransaction = new Transaction({amount, note, type, amount: userId})
    try {
        const createdTransaction = await newTransaction.save(req, res)
        let updatedUser = {...req.user}

        if (type==='INCOME') {
            updatedUser.balance = Number(updatedUser.balance) + Number(amount)
            updatedUser.income = Number(updatedUser.balance) + Number(amount)

        }else if (type==='EXPENSE'){
            updatedUser.balance = updatedUser.balance - amount
            updatedUser.expense = updatedUser.balance + amount
        }
        updatedUser.transaction.unshift(createdTransaction._id)

        User.findByIdAndUpdate(updatedUser._id, {$set: updatedUser})
        res.status(201).json({
            message: 'Transaction Successfully!',
            transaction: createdTransaction
        })

    } catch (error) {
        if(error) serverError(res, error)
    }

}

// Transaction all get Controller

exports.getAll = (req, res) =>{
    Transaction.find().then(transactions =>{
        if (transactions.length === 0) {
            return res.status(200).json({
                message: 'No Transaction Found'
            })
        }
        res.status(200).json(transactions)


    }).catch(error =>serverError(res, error))
    
}

exports.getSingleTransaction = (req, res) =>{
    const {transactionId} = req.params

    Transaction.findById(transactionId)
        .then(transaction=>{
            if (!transaction) {
                return res.status(200).json({message:'No Transaction Found'})
            }
            return res.status(200).json(transaction)


        }).catch(error =>serverError(res, error))
}

exports.update = (req, res) =>{
    let {transactionId} = req.params
    User.findByIdAndUpdate(transactionId,{$set: req.body})
        .then(result=>{
            res.status(200).json({
                message: 'Deleted Successfully',
                result
            })
        }).catch(error =>serverError(res, error))
}

exports.remove = (req, res)=>{
    let {transactionId}= req.params
    User.findByIdAndDelete(transactionId)
        .then(result=>{
            res.status(200).json({
                message: 'Delete Successfully',
                result
            })
        }).catch(error =>serverError(res, error))
}