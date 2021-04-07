const registerValidator = require('../validator/signupValidator')
const User = require('../model/User')
const bcrypt = require('bcrypt')
const {serverError, resourceError} = require('../util/error')
const jwt = require('jsonwebtoken')

exports.registerGetController = async (req, res, next) =>
{
    const usernames = []
    await User.find({}, (err, user) =>
    {
        if (user.length > 0) {
            for (let i = 0; i < user.length; i++) {
                const element = user[i];
                usernames.push(element.username)
            }
            return res.json(usernames)
        }
        if(err) serverError(res, err)
    })
}

exports.registerPostController = async (req, res, next) =>
{

    const registerUser = req.body
    const {name, email, password, country, username} = registerUser
    const validate = registerValidator(registerUser)
    if (!validate.isValid) {
        res.status(400).json(validate.errors)
    } else {
        User.findOne({ email })
            .then((user) =>
            {
                if (user) return resourceError(res, 'user already exist')

                User.findOne({username}).then( user =>{
                    if (user) if (user) return resourceError(res, 'username already exist')
                }).catch((err) => serverError(res, err))
                
                bcrypt.hash(password, 11, (err, hash) =>
                {
                    if (err) {
                        return serverError(res, err)
                    }
                    let user = new User({ 
                        name,
                        username, 
                        country, 
                        email, 
                        password: hash,
                        transaction:[],
                        amount: 0,
                        income:0,
                        expense:0
                     })
                    user.save()
                        .then((user) =>
                        {
                            res.status(200).json({
                                message: 'User created successfully',
                                user
                            })
                        })
                        .catch((err) => serverError(res, err))
                })
            })
            .catch((err) => serverError(res, err))
    }
}


exports.loginPostController = async (req, res, next) =>
{
    const { username, password } = req.body
    await User.findOne({ username })
        .then((user) =>
        {
            if (!user) return resourceError(res, 'don\'t have any account ')
            bcrypt.compare(password, user.password, (err, result) =>
            {
                if (err) return serverError(res, err)
                if (!result) return resourceError(res, 'Password dose not match')
                if (result) {
                    const token = jwt.sign({
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        isAuthenticated: true,
                        amount: user.amount,
                        income: user.income,
                        expense: user.expense,
                        transaction: user.transaction
                    }, 'SECRET', { expiresIn: '2h' })
                    
                    res.status(200).json({
                        message: 'Login successful',
                        token: `Bearer ${token}`
                    })
                }
            })
        })
        .catch((err) => serverError(res, err))
}