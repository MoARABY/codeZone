const bcrypt = require('bcrypt');
const User=require('../models/userModel');
const jwt = require('jsonwebtoken');

const userRegister= async (req, res) => {
    const {userName, email, password} = req.body
    if(!userName || !email || !password){
        res.status(400).send("Please enter all fields")
    }
    if(password.length < 8){
        res.status(400).send("Password must be at least 8 characters")
    }
    if(!email.includes("@")){
        res.status(400).send("Invalid email")
    }
    const findUser = await User.findOne({email: email})
    if(findUser){
        res.status(400).send("User already exists")
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = await User.create({
        userName,
        email,
        password:hashedPassword,
    })
    if(newUser){
        res.status(201).send("User created successfully")
    } else {
        res.status(500).send("User not created")
    }
}
const userLogin = async (req,res) =>{
    const email= req.body.email;
    if(!email || !req.body.password){
        res.status(400).send("Please enter all fields")
    }
    if(!email.includes("@")){
        res.status(400).send("Invalid email")
    }
    const findUser=await User.findOne({email:email})
    if(!findUser){
        res.status(400).send("User does not exist")
    }
    const validPassword  = await bcrypt.compare(req.body.password,findUser.password)
    if(!validPassword){
        res.status(400).send("Invalid password")
    }
    const accessToken = jwt.sign({id:findUser._id,isAdmin:findUser.isAdmin}, process.env.SECRET_KEY)
    const{password,isAdmin,...others}=findUser._doc;
    return res.cookie("Token",accessToken,{
        httpOnly:true,
        // secure: true, // Ensures the cookie is sent only over HTTPS
        // signed: true,
        // maxAge: 24 * 60 * 60 * 1000 // 1Day
    }).status(200).json({message:"Login successful",others,accessToken});
}

module.exports = {userRegister, userLogin}