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
          console.log(loggedUser)

            if(!loggedUser){
              console.log('Não há usuário logado')
            }
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
    // espera que o ID esteja na barra de endereço

    const updates = Object.keys(req.body);
    const allowedUpdates = ['title','body'];
    const isValidOperation = updates.every((update)=>{
      allowedUpdates.includes(update);
    })
    if(!isValidOperation){
      return res.status(400).send({'error':'invalid updates!'})
    }
    
    try{
      const note = await Note.findById(req.params.id);
      updates.forEach((update)=>{
      note[update] = req.body[update]
      })
      await note.save();

      if(!note){
        return res.status(404).send();
      }

    }
    catch(e){
      res.status(400).send(e);
    }

  }

}