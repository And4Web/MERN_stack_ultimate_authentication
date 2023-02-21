const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();

const port = process.env.PORT || 5000;
const app = express();

//Database connection
mongoose.connect(process.env.DATABASE, {
  //use these properties for mongoose deprecation warnings:
  useNewUrlParser: true,
  // useFindAndModify: false,
  useUnifiedTopology: true,
  // useCreateIndex: true
})
.then(() => console.log('mongoDB connection successful.'))
.catch(err => console.log('mongoDB connection Error: ', err))

const User = require('./models/userModel');

//import routes
const authRouter = require('./routes/authRoute');
const userRouter = require('./routes/userRoute');

//app middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
// app.use(cors); //cross origin requests
if(process.env.NODE_ENV = 'development'){
  app.use(cors({origin: 'http://localhost:3000'}))
}

//middleware

app.get('/', (req, res) => {
  res.send("Hello Anand! 🤠");
})
app.get('/api/users', (req, res) => {
 User.find({}, {hashedPassword: 0, salt: 0, __v:0}).then(user => {  
  res.status(200).json(user)
 }).catch(err=>{
  // console.log("Error finding users: ", err.message);
  res.status(400).json({Error: `Error finding user: ${err.message}`})
  })
})

//implement routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.listen(port, () => console.log(`Server is running at port: ${port} - ${process.env.NODE_ENV}`))