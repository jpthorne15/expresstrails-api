const express = require('express');
const router = express.Router();
const monk = require('monk')
//using Monk from npmjs.org to connect to Mongo Database
const db = monk ('mongodb://JimmyHendrix:813moveOverRover@cluster0-shard-00-00-ffkvd.mongodb.net:27017,cluster0-shard-00-01-ffkvd.mongodb.net:27017,cluster0-shard-00-02-ffkvd.mongodb.net:27017/TRAILS?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true')
// This is a constant that has the web address for the my collection in the Mongo database
const images = db.get('IMAGES-RECORDINGS')
// IMAGES-RECORDINGS is the cluster where the images and related data is located

router.get('/', async function (req, res,next) {
  const results = await images.find ({})
 res.send(results)
});

router.post('/', async function (req, res) {
  const data = req.body
  console.log(data) 
  const results = await images.insert(data);
  console.log("createImage",results)

  res.send(results)
})

router.put('/:id', async function (req, res){
  const data = req.body
  console.log('data',data) 
  const results = await images.update ({_id:req.params.id}, data);//req is request -id property expected to be in database study request parameters
  console.log('updateImage',results)
  res.send(results)
  
})

router.delete('/:id', async function (req, res){
  const results = await images.remove ({_id:req.params.id});
  //check Monk documentation for remove and update method
  console.log('deleteImage',results)
  res.send(results)
})
module.exports = router;

