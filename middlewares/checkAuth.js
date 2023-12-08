import bcrypt from 'bcrypt';
import User from '../models/userModel.js';

export default (req,res,next)=>{
    // check for basic auth header
    if(!req.headers.authorization || req.headers.authorization?.indexOf('Basic') === -1){
        return res.status(401).json({message: 'Invalid auth header'});
    }

    //verify basic auth

    const base64Credentials = req.headers.authorization.split(' ')[1];

    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');

    const [email, password] = credentials.split(':');

     User.findOne({email: email}).then((user)=>{
         bcrypt.compare(password, user.password).then(()=>{
             console.log("Password correct login is succeed");
 //attache user to request object
            req.user = user._doc;
            next();

         }).catch((err)=>{
             console.log(err);
         });
     }).catch((err)=>{
         console.log(err);
     });

  
};