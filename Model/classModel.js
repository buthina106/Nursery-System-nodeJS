const mongoose =require ("mongoose");

const classSchema = new mongoose.Schema({
    _id: Number,
    name:{
         type: String, 
         required: true 
        },
    supervisor:{
         type: mongoose.Schema.Types.ObjectId,
         ref: "teachers",
         required: true 
        },
    children:
     [{ 
        type: Number,
         ref: "child",
         required: true 
         }] 
  });


  module.exports=mongoose.model("class",classSchema);