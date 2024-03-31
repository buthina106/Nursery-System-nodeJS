const mongoose =require ("mongoose");
/**
 * @swagger
 * paths:
 *   /login:
 *     post:
 *       summary: Log in to the system
 * 
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fullName:
 *                   type: string
 *                 password:
 *                   type: string
 *       responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   teacher:
 *                     $ref: '#/components/schemas/Teacher'
 *                   token:
 *                     type: string
 *         '401':
 *           description: Unauthorized
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