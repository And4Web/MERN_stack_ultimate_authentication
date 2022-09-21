const express = require('express');

const app = express();

const port = process.env.PORT || 5000;

//import routes
const authRouter = require('./routes/authRoute');

app.use(express.json());

app.get('/', (req, res) => {
  res.json("Hello Anand!");
})

app.use('/api/auth', authRouter)

app.listen(port, () => console.log(`Server is running at port: ${port}.`))