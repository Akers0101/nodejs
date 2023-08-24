var mongoose = require ('mongoose');
// tạo bảng Category với các trường thông tin ở dưới
var CategorySchema = mongoose.Schema({
   name: String,
   
});
const CategoryModel = mongoose.model('category', CategorySchema, 'category');
module.exports = CategoryModel;