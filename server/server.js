const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config()
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport');




const app = express()
const { PORT, DB_USER, DB_PASS, DB_NAME } = process.env



app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(passport.initialize())
require('./passport')(passport)

// All routes
app.use(`/api/user`, require('./routes/userRoute'))
app.use(`/api/transaction`, require('./routes/transactionRoute'))


app.get('/', (req, res) =>
{
    res.send('Server is running')
})


const port = PORT || 8080
const URL = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.um5ig.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

app.listen(port, () =>
{
    mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true }, () =>
    {
        console.log(`Database is connected!`);
    })
    console.log(`Server is Running: ${port}`);
})