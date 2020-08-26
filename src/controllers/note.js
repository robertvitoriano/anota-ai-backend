const Note =require('../models/Note');
const User = require('../models/User');
const { update } = require('../models/Note');

module.exports = {
    async store(req,res){
        const user =req.user;
        const{title,body} = req.body;
        const note = new Note({title,body,authorId:user._id});
        try{
            await note.save();

            const loggedUser = await User.findById(user._id);
            await loggedUser.notesId.push(note._id);
            await loggedUser.save();
            
            res.send(note);

        }catch(e){
            console.log(e);
        }
    },

  async index (req,res){
      const  user  = req.user;
      const notes = await Note.find({authorId:user._id});
      if(!notes){
        return console.log("You haven't post anything yet")
      }
      
    return res.send(notes)
  },

  async update(req,res){
    
    try{
      const note = await Note.findById(req.params.id);
      note.title = req.body.title;
      note.body = req.body.body;
      await note.save();
      return res.send(note);
    }
    catch(e){
      res.status(400).send(e);
    }

  },

  async read(req,res){
    try{
      const note = await Note.findById(req.params.id);
      res.send(note);
    }
    catch(e){
      res.status(400).send(e);
    }
  },

    async delete(req, res) {
    try {
      const note = await Note.deleteOne({ _id: req.params.id});
      res.send();

    }
    catch (e) {
      res.status(400).send(e);
    }
  }
}