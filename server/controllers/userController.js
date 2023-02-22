const User = require('../models/userModel');

exports.getUser = (req, res) => {
  const userId = req.params.id;

  User.findById(userId, {hashedPassword: 0, salt: 0, __v: 0}).exec((err, user)=>{
    if(err || !user){
      return res.status(400).json({Error: err.message})
    }
    return res.status(200).json({user: user})
  })
}

exports.updateUser = (req, res) => {
  // console.log('UPDATE USER<===>req.AUTH:', req.auth, "<===>update data:", req.body.name)
  const {name, password} = req.body;
  User.findOne({_id: req.auth._id},{hashedPassword: 0, salt: 0, __v:0}, (err, user)=>{
    if(err || !user){
      return res.status(400).json({Error: "User not found"})
    } 
    if(!name || name.length < 3){
      return res.status(400).json({Error: "Name is Required"})
    } else{
      user.name = name;
    }
    if(!password || password.length < 8){
      return res.status(400).json({Error: "Password must be at least 8 characters long."})
    } else{
      user.password = password;
    }
    user.save((err, updatedUser) => {
      if(err){
        console.log("UPDATED USER ERROR: ", err.message)
        return res.status(402).json({"User update failed": err.message})
      }
      updatedUser.hashedPassword = undefined;
      updatedUser.salt = undefined;
      res.json({updatedUser: updatedUser})
    })
  })
}