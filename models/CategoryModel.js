var mongoose = require ('mongoose');
var CategorySchema = mongoose.Schema({
   name: String,
   
});
const CategoryModel = mongoose.model('category', CategorySchema, 'category');
module.exports = CategoryModel;