const Post =require('../models/Post');
const User = require('../models/User');
const { Mongoose } = require('mongoose');
const { findById } = require('../models/Post');

module.exports = {
    async store(req,res){
        const {user} =req.headers;
        const{title,body} = req.body;
        const post = new Post({title,body,authorId:user});
          console.log('esta '+user);
        try{
            await post.save();
            const loggedUser = await User.findById(user);
            await loggedUser.postsId.push(post._id);
            await loggedUser.save();

            console.log('Worked');
            res.send(post);

        }catch(e){
            console.log(e);
        }
    },

  async index (req,res){
      const { user } = req.headers;
    //    const loggedUserId = await User.findById(user).postsId.map(()=>{})
      const posts = await Post.find({authorId:user});
    //   const chosenPosts = posts.filter((post)=>{post.authorId===user})
      if(!posts){
        return console.log("You haven't post anything yet")
      }
      
    return res.send(posts)
 
    

  }
}