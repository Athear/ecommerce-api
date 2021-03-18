const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try{
  const categories = await Category.findAll({
    include:[{model:Product}]
  });
  res.status(200).json(categories);
  }
  catch(err){
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try{
    const category = await Category.findByPk(req.params.id,{
      include:[{model:Product}]
    });
    if(category){
      res.status(200).json(category);  
    }else{
      res.status(404).json(`No category with ID ${req.params.id} found`);  
    }    
  }
  catch(err){
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try{
    if(req.body.category_name){
      const newCategory = await Category.create({
        category_name:req.body.category_name
      });
      res.status(200).json(newCategory)
    }
    else{
      res.status(400).json("category_name must be specified")
    }
  }
  catch{
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
