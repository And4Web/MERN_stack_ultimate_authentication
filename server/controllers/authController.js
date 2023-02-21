const jwt = require("jsonwebtoken");
const sendGridMail = require("@sendgrid/mail");
const {expressjwt} = require('express-jwt');

sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

const User = require("../models/userModel");

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
  const { name, email, password } = req.body;
  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "This email already exists.",
      });
    }
    const token = jwt.sign(
      { name, email, password },
      process.env.JWT_ACCOUNT_ACTIVATION,
      { expiresIn: "1h" }
    );

    const emailData = {
      from: process.env.EMAIL_TO,
      to: email,
      subject: `Account activation link`,
      html: `
        <h1>Please click the following Link to activate your account:</h1>
        <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
        <hr/>
        <p>The above link may contain sensitive information. Please don't share it with anyone.</p>
        <p>${process.env.CLIENT_URL}</p>
      `,
    };
    sendGridMail.send(emailData).then(
      (sent) => {
        console.log("sendgrid sent email:", sent);
        return res.json({
          message: `Email has been sent to ${email}.Follow the instructions to activate your account.`
        });
      },
      (error) => {
        console.log("sendgrid email sending error:", error);
        return res.json({
          message: error
        })        
      }
    );
  });
};


exports.activateAccount = (req, res) => {
  const {token} = req.body;

  if(token){
    jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err, decodedToken) => {
      if(err){
        console.log('account activation error: ', err);
        return res.status(401).json({
          error: 'Expired link, Signup again.'
        })
      }
      const {name, email, password} = jwt.decode(token);
      const user = new User({name, email, password});

      user.save((err, user) => {
        if(err){
          console.log('account activation error: ', err);
          return res.status(401).json({
            error: 'Error saving user in database. Try again later.'
          })
        }
        return res.json({
          message: 'Sign up success. Please sign in.'
        })
      })
    })
  }
  else{
    return res.json({
      message: 'something went wrong. Please sign up again.'
    })
  }
}

exports.signin = (req, res) => {
  const {email, password} = req.body;
  User.findOne({email}).exec((err, user) => {
    //check if user exists
    if(!user || err){
      return res.status(400).json({
        error: 'User with this email doesn\'t exist. Please sign up.'
      })
    }
    // authenticate
    if(!user.authenticate(password)){
      return res.status(401).json({
        error: 'Wrong Password. Please try again.'
      })
    }
    //generate token and send to the client
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
    const {_id, name, email, role} = user;

    return res.json({
      token,
      user: {_id, name, email, role}
    })
  })
}

exports.requireSignin = expressjwt({
  secret: process.env.JWT_SECRET, 
  algorithms: ["HS256"]
})