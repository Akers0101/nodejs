var express = require('express');
const ToyModel = require('../models/ToyModel');
const CategoryModel = require('../models/CategoryModel');
const BrandModel = require('../models/BrandModel');
var router = express.Router();

//lấy dữ liệu từ collection toys
router.get('/', async (req, res) => {
   //tìm tất cả các document trong collection toys
   var toys = await ToyModel.find();
   //trả dữ liệu tìm được về trang(file) view/toys/toysList
   res.render('toys/toysList', { toys: toys  });
});

//xóa document 
router.get('/delete/:id', async (req, res) => {
   //tìm document có id và thực hiện xóa
   await ToyModel.findByIdAndDelete(req.params.id);
   //sau khi xóa sẽ trở về trang toys
   res.redirect('/toys');
});

//lấy dữ liệu của collection category
router.get('/add', async(req, res) => {
   //tìm tất cả các document trong collection category
   var categories = await CategoryModel.find();
   var brands = await BrandModel.find();
   ////trả dữ liệu tìm được về trang(file) view/toys/toysAdd
   res.render('toys/toysAdd',{category: categories, brand: brands});
});

//thêm document vào collection toys
router.post('/add', async (req, res) => {
   //lấy dữ liệu từ page toysAdd về
   var toys = req.body;
   //thêm mới document từ dữ liệu nhận về
   await ToyModel.create(toys)
   //nếu thêm mới thanh công thì log ra message
      .then(console.log('Add toys successfully !'))
      // nếu thát bài thì log ra lỗi
      .catch(err => console.log(err));
   // page sẽ chuyển về trang toys
   res.redirect('/toys');
});

//lấy dữ liệu cho page edit
router.get('/edit/:id', async (req, res) => {
   //lấy id khi chọn nút edit
   var id = req.params.id;
   //lấy tất cả document cho category
   var categories = await CategoryModel.find();
   var brands = await BrandModel.find();
   //tìm document với id
   var toys = await ToyModel.findById(id);
   //trả dữ liệu về trang toys/toysEdit
   res.render('toys/toysEdit', { toys: toys, categories: categories,brand: brands});
});

//gửi dữ liệu đã edit
router.post('/edit/:id', async (req, res) => {
  //tìm document với id đã chọn và update theo dữ liệu từ trang toys/toysEdit
   await ToyModel.findByIdAndUpdate(req.params.id, req.body)
   //nếu thêm mới thanh công thì log ra message
      .then(console.log('Edit toys successfully !'))
        // nếu thát bài thì log ra lỗi
      
      .catch(err => console.log(err));
   //chuyển hướng về trang toys
  res.redirect('/toys');
});

//tìm kiếm 
router.post('/search', async (req, res) => {
   //lấy dữ liệu cần tìm kiếm từ page
   var keyword = req.body.keyword;
   //tìm các document có name có chứa các kí tự keyword
   var toys = await ToyModel.find({ name : new RegExp(keyword, "i")})
   //trả dữ liệu tìm được về page toys/toysList
   res.render('toys/toysList', { toys: toys });
})

//sắp xếp theo caterory 
router.get('/sort/category/asc', async (req, res) => {
   //sắp xếp theo caterory theo chiều tăng dần
   var toys = await ToyModel.find().sort({ category: 1 });
   //trả dữ liệu sau khi sắp xếp về page toys/toysList
   res.render('toys/toysList', { toys: toys });
})
//sắp xếp theo caterory
router.get('/sort/category/desc', async (req, res) => {
   //sắp xếp theo caterory theo chiều giảm dần
   var toys = await ToyModel.find().sort({ category: -1 });
   //trả dữ liệu sau khi sắp xếp về page toys/toysList
   res.render('toys/toysList', { toys: toys });
})
//sắp xếp theo color
router.get('/sort/color/asc', async (req, res) => {
//sắp xếp theo color theo chiều tăng dần
   var toys = await ToyModel.find().sort({ color: 1 });
    //trả dữ liệu sau khi sắp xếp về page toys/toysList
   res.render('toys/toysList', { toys: toys });
})
//sắp xếp theo color
router.get('/sort/color/desc', async (req, res) => {
   //sắp xếp theo color theo chiều giảm dần
   var toys = await ToyModel.find().sort({ color: -1 });
    //trả dữ liệu sau khi sắp xếp về page toys/toysList
   res.render('toys/toysList', { toys: toys });
})

module.exports = router;