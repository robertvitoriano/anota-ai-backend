const CategoryModel = require('./../models/Category');
const UserModel = require('./../models/User');
const NoteModel = require('./../models/Note')

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
           const notes = await NoteModel.find({categoryId:categoryId});
           console.log(notes);
           res.send({category:category,notes:notes});
           
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
   },
   async associate(req,res){
       try {
           const {notesId} = req.body;
           const {categoryId} = req.params;
           let notes = []
           notesId.map(async(id)=>{
            const note =  await NoteModel.findByIdAndUpdate(id,{categoryId:categoryId});
            await note.save();
            notes.push(note)
           })
 
           res.send(notes);

           
       } catch  {
           
       }
   },


}