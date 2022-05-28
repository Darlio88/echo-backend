import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';

import UserModel from '../Models/UserModel.js'

export const createUser = async (req, res) => {
try {
   
const {Email, FirstName, LastName, Password} = req.body
const user = await UserModel.findOne({Email: Email})
if (user) return res.status(404).json({error: 'User already exists'})

var salt = bcrypt.genSaltSync(10);
var hashedPassword = bcrypt.hashSync(Password, salt);
const newUser = new UserModel({Email, PasswordHash:hashedPassword, Name:FirstName+LastName})
await newUser.save()
const token = jwt.sign({Email:newUser.Email, id:newUser._id}, process.env.TOKEN_KEY, {expiresIn: '1h'})
res.status(200).json({result:newUser,token}) 
} catch (error) {
    res.status(500).send({error: error.message})
}

}

export const signinUser = async (req, res) => {
try {
  const {Email, Password} = req.body
const user =await UserModel.findOne({Email: Email})
console.log(user)
if (!user) return res.status(404).json({error: 'User doesnot exist'})
const correctPassword=bcrypt.compareSync(Password, user.PasswordHash);
if (!correctPassword) return res.status(404).json({error: 'password is incorrect'})

const token = jwt.sign({Email: user.Email, id: user._id}, process.env.TOKEN_KEY, {expiresIn: '1h'})
res.status(200).json({result: user, token})  
} catch (error) {
  res.status(500).send({error: error.message})  
}
}