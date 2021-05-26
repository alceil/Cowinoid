const mongoose = require('mongoose')
const subbedUserModel = mongoose.Schema({
  authorid: {type: String},
  distcode: {type: String},
  age: {type: Number},
  notify:{type: Boolean,default: false },}
)
module.exports = mongoose.model("subbedUserModel", subbedUserModel);