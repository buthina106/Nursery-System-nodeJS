const classSchema=require("./../Model/classModel")
const childSchema = require("./../Model/childModel");
const teacherSchema=require("./../Model/TeacherModel")

exports.getAllClasses = (req, res, next) => {
  classSchema.find()
      .populate({
          path: 'supervisor',
          select: { fullName: 1, email: 1, image: 1 }
      })
      .populate({
          path: 'children',
          select: { fullName: 1, age: 1, level: 1, address: 1 }
      })
      .then((classes) => {
          res.status(200).json({ data: classes });
      })
      .catch((error) => next(error));
};
  
exports.getClassById = (req, res, next) => {
  const classId = req.params.id;
  classSchema.findById(classId)
      .populate({
          path: 'supervisor',
          select: { fullName: 1, email: 1, image: 1 }
      })
      .populate({
          path: 'children',
          select: { fullName: 1, age: 1, level: 1, address: 1 }
      })
      .then((classData) => {
          if (!classData) {
              throw new Error("Class not found");
          }
          res.status(200).json({ data: classData });
      })
      .catch((error) => next(error));
};
  
exports.addNewClass = (req, res, next) => {
  const newClass = new classSchema(req.body);
  newClass.save()
      .then((classData) => {
          res.status(200).json({ message: "Class added successfully", data: classData });
      })
      .catch((error) => next(error));
};
  
  exports.updateClass = (req, res, next) => {
    const classrId = req.params._id;
    classSchema.findByIdAndUpdate(classrId, req.body, { new: true })
    .then((updateClass) => {
      if (!updateClass) {
        throw new Error("Class not Exists");
      }
      res.status(200).json({ message: "Class updated successfully", data: updateClass });
    })
  .catch((error) => next(error));
  };


  exports.deleteClass = (req, res, next) => {
    const classId = req.params.id;
    classSchema.findByIdAndDelete(classId)
      .then((deletedClass) => {
        if (!deletedClass) {
          return res.status(404).json({ message: "Class not found" });
        }
        res.status(200).json({ message: "Class deleted successfully", data: deletedClass });
      })
      .catch((error) => next(error));
};
  exports.getChildInfo = (req, res, next) => {
    const childId = req.params.id;
    childSchema.findById(childId)
      .then((child) => {
        if (!child) {
          throw new Error("Child not found");
        }
        res.status(200).json({ data: child });
      })
      .catch((error) => next(error));
  };
  
  exports.getSupervisorInfo = (req, res, next) => {
    const supervisorId = req.params.id;
    teacherSchema.findById(supervisorId)
      .then((supervisor) => {
        if (!supervisor) {
          throw new Error("Supervisor not found");
        }
        res.status(200).json({ data: supervisor });
      })
      .catch((error) => next(error));
  };