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

router.post('/', async (req, res) => {
  // create a new tag
  try{
    if(req.body.tag_name){
      const newTag = await Tag.create({
        tag_name:req.body.tag_name
      });
      res.status(200).json(newTag)
    }
    else{
      res.status(400).json("tag_name must be specified")
    }
  }
  catch{
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    if(req.body.tag_name){
      const updateStatus = await Tag.update(
        {
          tag_name:req.body.tag_name
        },
        {
          where:{
            id:req.params.id
          }
        }
      );
      if(updateStatus>0){
        res.status(200).json(`Tag name updated to ${req.body.tag_name}`);  
      }else{
        res.status(406).json(`Tag ${req.params.id} does not exist or was already named ${req.body.tag_name}`);  
      }    
    }else{
      res.status(400).json("tag_name must be specified")
    }
  }
  catch(err){
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
