const mongoose =require ("mongoose");

const teacherschema =new mongoose.Schema({

id: mongoose.Schema.Types.ObjectId,
fullName:{ 
    type: String, 
    required: true
    },
password:{ 
    type: String, 
    required: true 
    },
email:{ 
    type: String, 
    required: true 
    },
image:{ 
    type: String 
    }
}); 


module.exports=mongoose.model("teachers",teacherschema);