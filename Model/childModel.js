const mongoose = require("mongoose");

const childSchema = new mongoose.Schema({
    _id: Number,
    fullName:{ 
        type: String, 
        required: true 
    },
    age:{ 
        type: Number, 
        required: true 
    }, 
    level:{ 
        type: String, 
        enum: ['PreKG', 'KG1', 'KG2'], 
        required: true 
    },
    address: {
      city: String,
      street: String,
      building: String
    }
  });

  module.exports=mongoose.model("child",childSchema);