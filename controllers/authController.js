import bcrypt from 'bcrypt';
import User from '../models/userModel.js';


export const register = (req,res)=>{
    const username = req.body.username;
    const email = req.body.email;
    const role = req.body.role;



    bcrypt.hash(req.body.password, 10).catch(err=>{
        console.log(err);
    }).then(hash=>{
        const user = User.create({
            username: username,
            password: hash,
            email: email,
            role: role
        }).then(userData=>{
            res.status(201).json({
                username: userData.username, 
                email: userData.email,
                role: userData.role
            });
        }).catch(err=>{
            console.log(err);
        });
    });

};

export const login = (req,res)=>{
    
        const email = req.body.email;
       
        User.findOne({email: email}).then((user)=>{
            bcrypt.compare(req.body.password, user.password).then((user)=>{
                console.log("Password correct login is succeed");
            }).catch((err)=>{
                console.log(err);
            });
            res.status(206).json({
                username: user.username,
                email: user.email,
                role: user.role
            });
        }).catch((err)=>{
            console.log(err);
        });
    
};

