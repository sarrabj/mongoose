const mongoose = require ('mongoose')
const Schema = mongoose.Schema()
const contactSchema={
    name:String,
    age:Number,
    favoriteFoods: { type: [String] },
        
}
const contact=mongoose.model("contact",contactSchema)
module.exports= contact