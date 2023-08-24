var mongoose = require ('mongoose');
// tạo bảng Toys với các trường thông tin ở dưới
var ToySchema = mongoose.Schema({
   name: String,
   mfg: Date,
   category: String,
   brand: String,
   color: String,
   manufacture: String,
   detail: String,
});
const ToyModel = mongoose.model('toy', ToySchema, 'toy');
module.exports = ToyModel;