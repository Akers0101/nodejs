var express = require('express');
const BrandModel = require('../models/BrandModel');

var router = express.Router();

router.get('/add', async(req, res) => {
    //tìm tất cả các document trong collection category
   
    ////trả dữ liệu tìm được về trang(file) view/toys/toysAdd
    res.render('brand/brandAdd',{});
 });
router.post('/add', async (req, res) => {
    //lấy dữ liệu từ page toysAdd về
    var brands = req.body;
    //thêm mới document từ dữ liệu nhận về
    await BrandModel.create(brands)
    //nếu thêm mới thanh công thì log ra message
       .then(console.log('Add toys successfully !'))
       // nếu thát bài thì log ra lỗi
       .catch(err => console.log(err));
    // page sẽ chuyển về trang toys
    res.redirect('/toys/add');
 });
 module.exports = router;