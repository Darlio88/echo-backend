import mongoose from 'mongoose';

const userShema = mongoose.Schema({
    Email:{
        required: true,
        type: String,
    },
    PasswordHash: {
        required: true,
        type: String,
    },
    Name: {
        required: true,
        type: String
    },
   
})

const UserModel = mongoose.model('User', userShema)

export default UserModel
