import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username : {
        type: String,
        require: true,
        unique: true
    },
    email : String,
    password : String,
    role : {
        type: String,
        default: 'user'
    }
});

const User = mongoose.model('User', userSchema);

export default User;