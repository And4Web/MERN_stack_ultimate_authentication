const User = require('../models/userModel');

/*exports.signup = (req, res) => {
 
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
*/

/*

another approach: The above approach is ok for small apps, but we will be using the concept of email confirmation, in order to save our database from spam user emails. This approach is used in real life applications. If an user provides a valid email then he will receive a confirmation email and only by varifying he will be stored in the database. In that confirmation email we will send the user signup information encoded in jwt.
*/
exports.signup = (req, res) => {
  
}