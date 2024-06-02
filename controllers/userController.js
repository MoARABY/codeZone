const userModel = require('../models/userModel')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const showUser= async (req, res) => {
    const id=req.params.id;
    const user=await userModel.findById(id)
    if(user){
        res.status(200).json(user)
    } else {
        res.status(404).send("User not found")
    }
}
const showUsers= async (req, res) => {
    const users=await userModel.find()
    if(users){
        res.status(200).json(users)
    } else {
        res.status(404).send("No users found")
    }
}
const updateUser= async (req, res) => {
    // || req.user.isAdmin
    if(req.body.userId == req.params.id ){
        if(req.body.password){
            try{
                const salt=await bcrypt.genSalt(10)
                req.body.password=await bcrypt.hash(req.body.password, salt)
            } catch(err){
                return res.status(500).send(err)
            }        
        }
        
        const updateUser = await userModel.findByIdAndUpdate(req.params.id,
            req.body,
            {new: true}
        );
        if(!updateUser){
            res.status(404).send("User not found")
        } else {
            res.status(200).json(updateUser)
        }
    } else {
        return res.status(403).json("You can delete only your account!");
    }
}
const deleteUser= async (req, res) => {
    if(req.body.userId == req.params.id){
        const deleteUser = await userModel.findByIdAndDelete(req.params.id)
        if(deleteUser){
            console.log(deleteUser)
            res.status(200).send("User deleted successfully")
        } else {
            res.status(500).send("User not found check the ID again")
        }
    } else {
        return res.status(403).json("You can delete only your account!");
    }
}
const followUser = async (req,res)=>{
    if (req.body.userId !== req.params.id) {
        const user=await userModel.findById(req.params.id)
        const currentUser=await userModel.findById(req.body.userId)
        if(!user.followers.includes(req.body.userId)){
            await user.updateOne({$push:{followers:req.body.userId}})
            await currentUser.updateOne({$push:{followings:req.params.id}})
            res.status(200).send("User has been followed")
        } else {    
            res.status(403).send("You already follow this user")
        }
    } else {
        res.status(403).send("You can't follow yourself")
    }
}
const unFollowUser = async (req,res)=>{
    if (req.body.userId !== req.params.id) {
        const user=await userModel.findById(req.params.id)
        const currentUser=await userModel.findById(req.body.userId)
        if(user.followers.includes(req.body.userId)){
            await user.updateOne({ $pull: { followers: req.body.userId } });
            await currentUser.updateOne({ $pull: { followings: req.params.id } });
            res.status(200).send("User has been unfollowed")
        }
        else{
            res.status(403).send("You don't follow this user")
        }
    } else {
        res.status(403).send("You can't unfollow yourself")
    }
}


module.exports = {showUser, showUsers , updateUser , deleteUser, followUser , unFollowUser }