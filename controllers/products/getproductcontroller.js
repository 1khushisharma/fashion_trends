// const mongoose = require("mongoose");
// const ProductCollection = require("../../models/ProductSchema");
// const getproductcontroller = async (req, res) => {
//   try {
//     const {category,name,sub_category}= req.params;
//     let products;
//     if(category)
//     {
//       const searchcategory=category.toLowerCase();
//       products = await ProductCollection.find({ category:{$regex: new RegExp(searchcategory,"i")}});

//     }

//     else if(name)
//     {
//       const searchcategory=name.toLowerCase();
//       products = await ProductCollection.find({ name:{$regex: new RegExp(searchcategory,"i")}});
//     }
//     else if(subcategory)
//     {
//       const searchcategory=subcategory.toLowerCase();
//       products = await ProductCollection.find({ sub_category:{$regex: new RegExp(searchcategory,"i")}});
//     }
//     else
//     {
//     const product = await ProductCollection.find();
    
//     console.log(`Product fetched successfully`);

//     }
//     if(products || products==0)
    
//       return res.status(404).send({message:"product not found."});

//   res.status(200).send(products);
    
//   } 
//   catch (error) {
//     res.status(504).send({
//       message: "Error fetching products",
//     });
//     console.log(`Error Occured :${error}`);
//   }
// };
// module.exports = getproductcontroller;

const mongoose = require("mongoose");
const ProductCollection = require("../../models/ProductSchema");
const getproductcontroller = async (req, res) => {
  try {
    const {id,category, sub_category, name } = req.params;
    let products;
    if(category){
      const searchcategory = category.toLowerCase();
      products = await ProductCollection.find({
        category: {$regex: new RegExp(searchcategory, "i")},
      });
    }
 
    else if(name){
      const searchname = name.toLowerCase();
      products = await ProductCollection.find({
        category: {$regex: new RegExp(searchname, "i")},
      });
    }
    else if(id){
      products = await ProductCollection.find({
        _id:id
      });
    }

    else if(req.path.includes("/random")){
      products= await ProductCollection.aggregate([
        {
          $sample:{
            size:9,
          },
        },
      ]);
    }
    else if(req.path.includes("/top-rated")){
      products= await ProductCollection.find().sort({rating:-1}).limit(9);//assending
    }
    else if(req.path.includes("/lowtohigh")){
      products= await ProductCollection.find().sort({new_price:1}).limit(9);
    }
    else if(req.path.includes("/hightolow")){
      products= await ProductCollection.find().sort({new_price:-1}).limit(9);
    }
    else if(sub_category){
      const searchsubcategory = sub_category.toLowerCase();
      products = await ProductCollection.find({
        sub_category: {$regex: new RegExp(searchsubcategory, "i")},
      });
    }
    else{
    products = await ProductCollection.find();
    console.log(`Product fetched successfully`);
    }
    if(!products || products.length == 0)
      return res.status(404).send({message: "Product not found"});
    res.status(200).send(products);

  } catch (error) {
    res.status(504).send({
      message: "Error fetching products",
    });
    console.log(`Error Occured :${error}`);
  }
};
module.exports = getproductcontroller;













