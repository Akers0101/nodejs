var express = require('express');
const ToyModel = require('../models/ToyModel');
const CategoryModel = require('../models/CategoryModel');
var router = express.Router();
router.get('/', async (req, res) => {
   var toys = await ToyModel.find();
  
   res.render('toys/toysList', { toys: toys  });
});

router.get('/delete/:id', async (req, res) => {
   
   await ToyModel.findByIdAndDelete(req.params.id);
   res.redirect('/toys');
});

router.get('/add', async(req, res) => {
   var categories = await CategoryModel.find();
   res.render('toys/toysAdd',{category: categories});
});

router.post('/add', async (req, res) => {
   var toys = req.body;
   await ToyModel.create(toys)
      .then(console.log('Add toys successfully !'))
      .catch(err => console.log(err));
   res.redirect('/toys');
});

router.get('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var toys = await ToyModel.findById(id);
   res.render('toys/toysEdit', { toys: toys });
});

router.post('/edit/:id', async (req, res) => {
  
   await ToyModel.findByIdAndUpdate(req.params.id, req.body)
      .then(console.log('Edit toys successfully !'))
      .catch(err => console.log(err));
  res.redirect('/toys');
});

router.post('/search', async (req, res) => {
   var keyword = req.body.keyword;
   var toys = await ToyModel.find({ name : new RegExp(keyword, "i")})
   res.render('toys/toysList', { toys: toys });
})

router.get('/sort/category/asc', async (req, res) => {
   var toys = await ToyModel.find().sort({ category: 1 });
   res.render('toys/toysList', { toys: toys });
})

router.get('/sort/category/desc', async (req, res) => {
   var toys = await ToyModel.find().sort({ category: -1 });
   res.render('toys/toysList', { toys: toys });
})

router.get('/sort/color/asc', async (req, res) => {
   var toys = await ToyModel.find().sort({ color: 1 });
   res.render('toys/toysList', { toys: toys });
})

router.get('/sort/color/desc', async (req, res) => {
   var toys = await ToyModel.find().sort({ color: -1 });
   res.render('toys/toysList', { toys: toys });
})

module.exports = router;