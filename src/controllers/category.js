const CategoryModel = require('./../models/Category');
const UserModel = require('./../models/User');
const { index } = require('./note');
const { listIndexes } = require('./../models/User');
module.exports = {
    async store(req,res){
        const user = req.user;
        const {name} = req.body;
        const category = new CategoryModel({name:name,authorId:user._id});

        try {
            await category.save();
            const loggedUser = await UserModel.findById(user._id);
            await loggedUser.categoriesId.push(category._id);
            await loggedUser.save();

            res.status(201).send(category);
            
        } catch (e) {

           console.log(e);
            res.status(400).send(e);
            
        }



    },

   async index(req,res){
       try {
           const categoryId = req.params.categoryId;
           const category = await CategoryModel.findById(categoryId);
           res.send(category);
           
       } catch (error) {
           res.status(400).send(error);
           
       }


   },
   async list(req,res){
       const {user} = req;
       try {
           const loggedUser = await UserModel.findById(user._id);
           const categories = await CategoryModel.find({ authorId: loggedUser._id })
           res.send(categories);

           
       } catch (e){
           res.send(e);
           
           
       }


   }

}