const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/0923", { useNewUrlParser: true, useUnifiedTopology: true })
const Schema = mongoose.Schema
const movieSchema = new Schema({
    title: String,
    stars: String,
    imgUrl: String,
    score: String,
    desc: String,
    p: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "City"
    }
})
const Movie = mongoose.model("Movie", movieSchema, "movie")
module.exports = Movie