const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email:{ type: String, required: true , unique : true },
  gender:{type:String, required:true},
  dob:{type:String,required:true},
  state:{type:String, required:true},
  language:{type:String, required:true},
  address:{ type: String, required: true },
  image:{type:String},  
  created_at: { type: Date, default: Date.now },
});

const EmployeeModel= mongoose.model('Employee', EmployeeSchema);

module.exports = EmployeeModel;  //export the model