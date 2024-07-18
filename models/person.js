const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const personschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        requierd: true,
        enum: ['chef', 'waiter', 'manager']
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

personschema.pre("save", async function (next) {
    const person = this;
    if (!person.isModified('password')) return next();

    try {
        //hash password generate
        const salt = await bcrypt.genSalt(10);

        //hash password
        const hashedpassword = await bcrypt.hash(person.password, salt)

        person.password = hashedpassword


    } catch (err) {
        return next(err)
    }
})



personschema.methods.comparePassword = async function (candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;

    } catch (err) {
        throw err;
    }
}


const person = mongoose.model('person', personschema);
module.exports = person;