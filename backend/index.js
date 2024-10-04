const express = require('express');
const mysql = require('mysql2');
const routes = require('./routes.js');
const hostname = '127.0.0.1';
const port = 3000;
const app = express();

app.use('/',routes)

app.listen(port, ()=>{
  console.log(`Server is running on port ${port}`);
})

