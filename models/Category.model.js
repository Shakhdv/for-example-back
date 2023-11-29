const mongoose = require ("mongoose")

const categorySchema = mongoose.Schema({
    Name: String
})
const Category = mongoose.model("Category",categorySchema)

module.exports = Category
