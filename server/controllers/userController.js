const User = require('../models/userModel');

exports.getUser = (req, res) => {
  const userId = req.params.id;

  User.findById(userId, {hashedPassword: 0, salt: 0, __v: 0}).exec((err, user)=>{
    if(err || !user){
      return res.status(400).json({error: err.message})
    }
    return res.status(200).json({user: user})
  })
}