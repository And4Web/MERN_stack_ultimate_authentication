const mongoose = require('mongoose');
const crypto = require('node:crypto');

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    trim: true,
    max: 100,
    required: true
  },
  email:{
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  salt: String,
  role: {
    type: String,
    default: 'subscriber'
  },
  resetPasswordLink: {
    data: String,
    default: ''
  }
}, {timestamps: true})

//virtual

userSchema.virtual('password')
.set(function(password){
  this._password = password;
  this.salt = this.makeSalt();
  this.hashedPassword = this.encryptPassword(password);
})
.get(function(){
  return this._password;
})

//methods

userSchema.methods = {
  authenticate: function(plainText){
    return this.encryptPassword(plainText) === this.hashedPassword;
  },
  encryptPassword: function (password){
    if(!password) return '';
    try {
      return crypto.createHmac('sha1', this.salt)
      .update(password)
      .digest('hex');
    } catch (error) {
      return '';
    }
  },  
  makeSalt: function (){
    return Math.round(new Date().valueOf()*Math.random()) + ''; //convert the number returned from Math.round() to string.
  }
}

module.exports = mongoose.model('User', userSchema);