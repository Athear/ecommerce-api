const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
//TODO: ProductTag is duplicating fields

router.get('/', async (req, res) => {
  try{
    const categories = await Tag.findAll({
      include:[{model:Product, through:{attributes:{exclude:['product_id','tag_id']}}},]
    });
    res.status(200).json(categories);
    }
    catch(err){
      console.log(err) //DEBUG
      res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
  try{
    const product = await Tag.findByPk(req.params.id,{
      include:[{model:Product, through:{attributes:{exclude:['product_id','tag_id']}}},]
    });
    if(product){
      res.status(200).json(product);  
    }else{
      res.status(404).json(`No tag with ID ${req.params.id} found`);  
    }    
  }
  catch(err){
    //console.log(err) //DEBUG
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
