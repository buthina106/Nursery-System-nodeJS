const mongoose =require ("mongoose");
/**
 * @swagger
 * components:
 *   schemas:
 *     Teacher:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         fullName:
 *           type: string
 *         email:
 *           type: string
 *         image:
 *           type: string
 */

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