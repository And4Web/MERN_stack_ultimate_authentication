const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

//import routes
const authRouter = require('./routes/authRoute');

//app middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
// app.use(cors); //cross origin requests
if(process.env.NODE_ENV = 'development'){
  app.use(cors({origin: 'http://localhost:3000'}))
}

//middleware


app.get('/', (req, res) => {
  res.json("Hello Anand!");
})

//implement routes
app.use('/api/auth', authRouter)

app.listen(port, () => console.log(`Server is running at port: ${port} - ${process.env.NODE_ENV}`))