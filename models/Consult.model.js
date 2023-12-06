const mongoose = require ("mongoose")

const consultSchema = mongoose.Schema({
    consultName:String,
    consultNumber:Number,
    consultMail:String,
    consultOrganization:String
})

const consult = mongoose.model("consult", consultSchema)

module.exports = consult