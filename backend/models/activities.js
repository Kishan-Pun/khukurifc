const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const activitiesSchema = new Schema({
    title: { type: String, required: true },
    detail: { type: String, required: true },
    date: { type: String, required: true },
    img: { type: String },
    vid: { type: String },
});

module.exports = mongoose.model('activities', activitiesSchema);
