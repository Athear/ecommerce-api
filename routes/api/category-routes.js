const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
//TODO: Have PUT and DELETE routes include name of affected objects

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

router.put('/:id', async (req, res) => {
  try{
    if(req.body.category_name){
      const updateStatus = await Category.update(
        {
          category_name:req.body.category_name
        },
        {
          where:{
            id:req.params.id
          }
        }
      );
      if(updateStatus>0){
        res.status(200).json(`Category name updated to ${req.body.category_name}`);  
      }else{
        res.status(406).json(`Category ${req.params.id} does not exist or was already named ${req.body.category_name}`);  
      }    
    }else{
      res.status(400).json("category_name must be specified")
    }
  }
  catch(err){
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
    try{
      const removedStatus = await Category.destroy({
        where:{
          id:req.params.id 
        }
      });
        if(removedStatus>0){
          res.status(200).json(`Category ${req.params.id} removed`);  
        }else{
          res.status(404).json(`Category ${req.params.id} does not exist`);  
        }    
    }
    catch(err){
      res.status(500).json(err);
    }

});

module.exports = router;
