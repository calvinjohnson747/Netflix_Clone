const express = require('express');
const myController =  require('./controller.js');
const router = express.Router();


router.get('/user/:userid/:password', myController.login);

router.get('/test', (req, res) => {
    res.send('Route /test is working!');
  });

router.post('/signup/:userid/:password', myController.signup);
  

module.exports = router;