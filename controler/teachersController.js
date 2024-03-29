const bcrypt = require('bcrypt');
const teacherSchema=require("./../Model/TeacherModel");

exports.getAllTeacher = (req, res, next) => {  
  teacherSchema.find({})
          .then((data)=>{
            res.status(200).json({ data });
          })
          .catch(error=>next(error));
  };
   
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
      image
  });
  newTeacher.save()
  .then((data) => {
      res.status(200).json({ message: "added", data });
  })
  .catch((error) => next(error));
});
};

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