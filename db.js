const mongoose = require('mongoose');

const mongourl = 'mongodb://localhost:27017/hotels'

mongoose.connect(mongourl)

const db = mongoose.connection;

db.on('connected', () => {
    console.log("connected to  mongodb server");
})

db.on('error', (err) => {
    console.log("mongodb connection erroe ",err);
})

db.on('disconnected', () => {
    console.log("Mongo disconnected");
})   

module.exports= db;