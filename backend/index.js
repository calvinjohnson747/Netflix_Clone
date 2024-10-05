const express = require('express');
const routes = require('./routes.js');
require('dotenv').config();

const app = express();

app.use('/',routes)

app.listen(process.env.PORT, ()=>{
  console.log(`Server is running on port ${process.env.PORT}`);
})

