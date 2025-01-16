const express = require("express");
const EmployeeModel = require("../model/employee");
const router = express.Router();
const multer = require("multer");
let path = require('path');


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'public/images');
  },
  filename: function(req, file, cb) {   
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if(allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
  } else {
      cb(null, false);
  }
}

let upload = multer({ storage:storage, fileFilter });

router.post("/employee",upload.single('image'), async (req, res) => {

  try {
    const user = await EmployeeModel.create({
      name: req.body.name,
      email: req.body.email,
      gender:req.body.gender,
      dob: req.body.dob,
      state:req.body.state,
      language:req.body.language,
      address:req.body.address,
      image: req.file.filename,
    });
    res.status(201).send(user);
    console.log(user);
    
  } catch (err) {
     res.status(404).json('Error: ' + err)
  }
});

router.get("/employee", async (req, res) => {
  try {
    const user = await EmployeeModel.find();
    res.send(user);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.get("/employee/:id", async (req, res) => {
  try {
    const user = await EmployeeModel.findById(req.params.id);
    res.send(user);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.put("/employee/update/:id",upload.single('image'), async (req, res) => {
  

  try {

    const singleUser = await EmployeeModel.findById(req.params.id);

    const user = await EmployeeModel.findByIdAndUpdate(req.params.id, {

        name: req.body.name||singleUser.name,
        email:req.body.email||singleUser.email,
        gender:req.body.gender||singleUser.gender,
        dob:req.body.dob||singleUser.dob,
        state:req.body.state||singleUser.state,
        language:req.body.language||singleUser.language,
        address:req.body.address||singleUser.address,
        image:req.body.image||req.file.filename,
        
    });
    res.json(user);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.delete("/employee/delete/:id", async (req, res) => {
  try {
    const user = await EmployeeModel.findByIdAndDelete(req.params.id);
    res.send(user);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = router;
