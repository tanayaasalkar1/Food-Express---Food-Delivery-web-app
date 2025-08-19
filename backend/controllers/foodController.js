// Using API to add new food items              
import foodModel from "../models/foodModel.js" 
import foodRoute from "../routes/foodRoute.js"                                                              
import fs from 'fs'  //file system 

//add food item
//to store product data into the database
const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category:req.body.category,
        image:image_filename
    })
    try{
        await food.save();
        res.json({success:true, message:"Food Added"})
    }catch (error){
        console.log(error)
        res.json({success:false, message:"Error"})
    }
}

//all food list
const listfood = async (req,res)=> {
    try {
        const foods = await foodModel.find({});
        res.json({success:true, data:foods});
    } catch (error) {
        res.json({success:false, message:"Error"});
    }
}

//remove food item
// remove food item
const removefood = async (req, res) => {
  try {
    const foodToRemove = await foodModel.findById(req.body.id);

    if (!foodToRemove) {
      return res.status(404).json({ success: false, message: "Food not found" });
    }

    // Delete image from uploads folder
    fs.unlink(`uploads/${foodToRemove.image}`, (err) => {
      if (err) console.log("Image delete error:", err);
    });

    // Delete item from DB
    await foodModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};




export {addFood,listfood,removefood}

