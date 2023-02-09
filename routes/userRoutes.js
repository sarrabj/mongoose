const express=require('express')
const router= express.Router()
const contact = require('../models/contactSchema')

//Create and Save a Record of a Model:
router.post('/newContact',(req,res)=>{
    let newContact= new contact(req.body)
    newContact.save((err,data)=>{
        if (err) throw err
        else res.send({msg:"contact added"})
    })
})
//Create Many Records with model.create()
router.post("/manyContact", (req, res) => {
    contact.create(
      { name: "hedyen", age: 26, favoriteFoods: ["Chips", "spaghetti"] },
      { name: "ilyes", age: 33, favoriteFoods: ["coffee", "jus"] },
      { name: "aicha", age: 15, favoriteFoods: ["frites"] },
      { name: "zaineb", age: 10, favoriteFoods: ["hamberger"] },
      (err, contact) => {
        if (err) throw err;
        else res.send({ msg: "Persons added" });
      }
    );
  });
  //model.find() to Search Your Database
  router.get("/getcontact",(req,res)=>{
    contact.find()
    .then((data) => res.json(data))
    .catch((err) => console.log(err))
      
  })
  //Use model.findOne() to Return a Single Matching Document from Your Database
  router.get("/getOne",(req,res)=>{
    contact.findOne({"favoriteFoods":["Chips", "spaghetti"]})
    .then((data) => res.json(data))
    .catch((err) => console.log(err))
  })
  //Use model.findById() to Search Your Database By _id
  router.get("/getbyid/:id",(req,res)=>{
    contact.find({_id:req.params.id})
    .then((data) => res.json(data))
    .catch((err) => console.log(err))

  })
  //Perform Classic Updates by Running Find, Edit, then Save
  router.put("/update/:id",(req,res)=>{
    contact.findByIdAndUpdate({_id:req.params.id},{...req.body},)
    .then((data) => res.json(data))
    .catch((err) => console.log(err))
  })
  //Perform New Updates on a Document Using model.findOneAndUpdate()
  router.put("/findNameAndSetAge/:name", (req, res) => {
    contact.findOneAndUpdate(
      { name: req.params.name },
      { ...req.body },
      (err, data) => {
        if (err) throw err;
        else {
          res.json(req.body);
        }
      }
    );
  });
  //Delete One Document Using model.findByIdAndRemove
  router.delete("/deleteOne/:id",(req, res)=>{
    contact.findOneAndRemove({_id:req.params.id},{...req.body},)
    .then((data) => res.json(data))
    .catch((err) => console.log(err))
  })

router.delete("/findAndDeleteMany", (req, res) => {
  contact.remove({ name: "aicha" }, (err, data) => {
    if (err) throw err;
    else {
      res.json({ msg: "deleted document", data });
    }
  });
});



  router.get('/allUser' , (req,res)=>{
    contact.find({ favoriteFoods : "pizza"}).select("name").limit(2)

    .then((data)=> res.status(200).json(data))
    .catch((err)=> res.json(err))
  })






  module.exports = router