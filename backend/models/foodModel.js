import mongoose from "mongoose";

//creating a schema for food model
const foodSchema = new mongoose.Schema({
    name: {type:String, required:true},
    description: {type:String, required:true},
    price: {type:Number, required:true},
    image: {type:String, required:true},
    category: {type:String, required:true}
})

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema)  //if the model is already it is used again otherwise model will be created and then use.

export default foodModel;