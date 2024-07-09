const mongoose = require('mongoose')

const menuItemschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    taste: {
        type: String,
        enum: ["sweet", "spicy", "sour"]
    },
    isdrink: {
        type: Boolean,
        default: false
    },
    ingradients: {
        type: [String],
        default: []
    },
    num_sales: {
        type: Number,
        default: 0
    }
})
const MenuItem = mongoose.model("menuItem", menuItemschema);
module.exports = MenuItem;