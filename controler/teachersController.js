const bcrypt = require('bcrypt');
const teacherSchema=require("./../Model/TeacherModel");


/**
 * @swagger
 * /teachers:
 *   get:
 *     summary: Get all teachers
 *     responses:
 *       200:
 *         description: Returns all teachers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Teacher'
 */
exports.getAllTeacher = (req, res, next) => {  
  teacherSchema.find({})
          .then((data)=>{
            res.status(200).json({ data });
          })
          .catch(error=>next(error));
  };
   
/**
 * @swagger
 * /teachers/{_id}:
 *   get:
 *     summary: Get teacher by ID
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the teacher to get
 *     responses:
 *       200:
 *         description: Returns the teacher
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Teacher'
 */
  exports.getTeachertById = (req, res, next) => {
    teacherSchema.findById(req.params._id )
    .then((teacher) => {
      if (!teacher) {
        throw new Error("Teacher not Exists");
      }
    res.status(200).json({ data:teacher });
  })
  .catch((error) => next(error));
  };
  
/**
 * @swagger
 * /teachers:
  *   post:
 *     summary: Create a new teacher
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Teacher'
 *     responses:
 *       200:
 *         description: Successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Teacher'
 */
exports.insertTeacher = (req, res, next) => {
  // res.json({ data: req.body, file: req.file });
  const { fullName, password, email, image } = req.body;
  // Technique 1 (generate a salt and hash on separate function calls)
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return next(err); 
    }
    const newTeacher = new teacherSchema({
      fullName,
      password:hashedPassword, 
      email,
      image:req.file.filename
  });
  newTeacher.save()
  .then((data) => {
      res.status(200).json({ message: "added", data });
  })
  .catch((error) => next(error));
});
};
/**
 * @swagger
 * /teachers/{_id}:
 *   patch:
 *     summary: Update teacher by ID
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the teacher to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Teacher'
 *     responses:
 *       200:
 *         description: Teacher updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Teacher'
 */
  exports.updateTeacher = (req, res, next) => {
    const teacherId = req.params._id;
    teacherSchema.findByIdAndUpdate(teacherId, req.body, { new: true })
    .then((updateTeacher) => {
      if (!updateTeacher) {
        throw new Error("Teacher not Exists");
      }
      res.status(200).json({ message: "Teacher updated successfully", data: updateTeacher });
    })
  .catch((error) => next(error));
  };

/**
 * @swagger
 * /teachers/{_id}:
 *   delete:
 *     summary: Delete teacher by ID
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the teacher to delete
 *     responses:
 *       200:
 *         description: Teacher deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Teacher'
 */
  exports.deleteTeacher=(req,res,next)=>{
    const teacherId = req.params._id; 
    teacherSchema.findByIdAndDelete(teacherId)
    .then((deletedTeacher) => {
      if (!deletedTeacher) {
        return res.status(404).json({ message: "Teacher not found" });
      }
      res.status(200).json({ message: "Teacher deleted successfully", data: deletedTeacher });
    })
    .catch((error) => next(error));
  };



  /**
 * @swagger
 * /teachers/{_id}/change-password:
 *   patch:
 *     summary: Change password for teacher
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the teacher to change password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated successfully
 */
  exports.changePassword = (req, res, next) => {
    const teacherId = req.params._id;
    const { oldPassword, newPassword } = req.body;

    teacherSchema.findById(teacherId)
      .then((teacher) => {
        if (!teacher) {
          throw new Error("Teacher not found");
      }
      
      bcrypt.compare(oldPassword, teacher.password, (err, result) => {
        if (err || !result) {
          throw new Error("Old password is incorrect");
        }

        bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
          if (err) {
            return next(err); 
          }
          
          teacher.password = hashedPassword;
          teacher.save()
            .then(() => {
              res.status(200).json({ message: "Password updated successfully" });
            })
            .catch(error => next(error));
        });
      });
    })
    .catch(error => next(error));
};
