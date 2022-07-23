const mongoose = require('mongoose');
const {mongodb} = require('./keys');
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true})
    .then(db => console.log("Database connected"))
    .catch(err => console.error(err))