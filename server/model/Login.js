const Schema = require('mongoose').Schema

const loginSchema = new Schema({
    email: {
        type: String,
    }
})