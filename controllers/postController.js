const postModel=require('../models/postModel');
const userModel=require('../models/userModel');



const showPost= async (req,res)=>{
const post= await postModel.findById(req.params.id)
    if(!post){
        res.status(404).send("Post not found")
    } else {
        res.status(200).json(post)
    }
}
const showPosts= async (req,res)=>{
    const currentUser= await userModel.findById(req.body.userId)
    const userposts= await postModel.find({userId:currentUser._id})
    if(currentUser.followings.length > 0) {
        const friendposts= await Promise.all(
            currentUser.followings.map((friendId)=>{
                return postModel.find({userId:friendId})
            })
        )
        if(userposts.length == 0 && friendposts.length == 0){
            res.status(404).send("No posts found")
        } else {
            res.status(200).send(userposts.concat(...friendposts))
    }
    } else {
        if(userposts.length == 0){
            res.status(404).send("No posts found")
        } else {
            res.status(200).json(userposts)
        }
    
    }
}
const createPost= async (req,res)=>{
    const newPost = new postModel(req.body)
    try{
    const savedPost= await newPost.save()
    res.status(200).json(savedPost)
    } catch (err) {
    res.status(500).json(err);
    }
}
const updatePost= async (req,res)=>{
 const findPost= await postModel.findById(req.params.id)
    if(findPost) {
        if(findPost.userId === req.body.userId){
            const updatePost= await postModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                {new:true})
                if(updatePost){
                res.status(200).json(updatePost)
                } else {
                res.status(404).send("could not update post")
            }   
        } else {
            res.status(401).send("You can update only your post")   
        }
 } else {
    res.status(404).send("Post not found")
}
}
const deletePost= async (req,res)=>{
    const findPost= await postModel.findById(req.params.id)
    if(findPost) {
        if(findPost.userId === req.body.userId){
            await postModel.findByIdAndDelete(req.params.id)
            res.status(200).send("Post has been deleted")
        } else {
            res.status(401).send("You can delete only your post")
        }
    } else {
        res.send(404).send("Post not found")
    }}
const react= async (req,res)=>{
    const findPost= await postModel.findById(req.params.id)
    if(!findPost.likes.includes(req.body.userId)){
        const likepost = await findPost.updateOne({$push:{likes:req.body.userId}})
        if(likepost){
            res.status(200).send("Post has been liked")
        } else {
            res.status(404).send("could not like post")
        }
    } else {
        const unlikepost = await findPost.updateOne({$pull:{likes:req.body.userId}})   
        if(unlikepost){
            res.status(200).send("Post has been unliked")
        } else {
            res.status(404).send("could not unlike post")
        }
    }
}

module.exports = {showPost, showPosts, createPost, updatePost, deletePost, react};   