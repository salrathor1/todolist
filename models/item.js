const mongoose = require('mongoose');

const Item = new mongoose.Schema({
    date: { type: Date, default: Date, required: true },
    item: { type: String, required: true },
    completed: { type: Boolean, default: false },
    colorCode: { type: String, default: "grey" }
}, {
    toObject: {virtuals: true}
})

module.exports = mongoose.model('items', Item); 