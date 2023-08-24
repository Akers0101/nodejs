var mongoose = require ('mongoose');
// tạo bảng Brand với các trường thông tin ở dưới
var BrandSchema = mongoose.Schema({
   name: String,
   
});
const BrandModel = mongoose.model('brand', BrandSchema, 'brand');
module.exports = BrandModel;