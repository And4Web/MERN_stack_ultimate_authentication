const User = require('../models/userModel');

exports.signup = (req, res) => {
  // res.json("Hello this is the signup route.");
  const {name, email, password} = req.body;

  User.findOne({email}).exec((err, user) => {
    if(user){
      return res.status(400).json({
        error: 'This email already exists.'
      })
    }
    let newUser = new User({name, email, password});
    newUser.save((err, success) => {
      if(err){
        consol.log("SIGNUP ERROR: ", err);
        return res.status(404).json({
          error: err
        });
      }
      res.json({
        message: "Registered successfully."
      })
    })
  })
}