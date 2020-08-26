const CategoryModel = require('./../models/Category');
const UserModel = require('./../models/User')
module.exports = {
    async store(req,res){
        const{user} = req.user;
        const {name} = req.body;
        const category = new CategoryModel({name:name,authorId:user._id});

        try {
            await category.save();
            const loggedUser = UserModel.findById(user._id);
            await loggedUser.categoriesId.push(category._id);
            await loggedUser.save();

            res.status(201).send(category);
            
        } catch (e) {

           console.log(e);
            res.status(400).send(e);
            
        }



    },

}