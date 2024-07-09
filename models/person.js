const mongoose = require('mongoose')

const personschema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        requierd: true,
        enum:['chef','waiter','manager']
    }
})
const person  = mongoose.model('person',personschema);
module.exports=person;