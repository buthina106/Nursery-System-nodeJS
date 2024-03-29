const childSchema = require("./../Model/childModel");


exports.getAllChild = (req, res, next) => { 
  childSchema.find({})
  .then((children)=>{
    res.status(200).json({ children});
  })
  .catch(error=>next(error));
}; 

exports.getChildtById = (req, res, next) => {
  childSchema.findById(req.params._id )

  .then((child) => {
      if (!child) {
        throw new Error("Child not exists");
      }
      res.status(200).json({ data: child });
    })
    .catch((error) => next(error));
};

  exports.insertChild = (req, res, next) => {
    const newChild=new childSchema(req.body);
    newChild.save()
    .then((child) => {
      res.status(200).json({message:"Added", child });
  })
  .catch((error) => next(error));
};
  


  exports.updateChild = (req, res, next) => {
    const childId = req.params._id;
    childSchema.findByIdAndUpdate(childId, req.body, { new: true })
    .then((updateChild) => {
      if (!updateChild) {
        throw new Error("Child not Exists");
      }
      res.status(200).json({ message: "Child updated successfully", data: updateChild });
    })
  .catch((error) => next(error));
  };



  exports.deleteChild=(req,res)=>{
    const childId = req.params._id; 
    childSchema.findByIdAndDelete(childId)
    .then((deletedChild) => {
      if (!deletedChild) {
        return res.status(404).json({ message: "Child not found" });
      }
      res.status(200).json({ message: "Child deleted successfully", data: deletedChild });
    })
    .catch((error) => next(error));
  };

