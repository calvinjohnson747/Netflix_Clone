const express = require('express');
const myController =  require('./controller/controller.js');
const awsController = require('./controller/aws.controller.js');
const router = express.Router();


router.get('/user/:userid/:password', myController.login);

router.get('/test', (req, res) => {
    res.send('Route /test is working!');
  });

router.post('/signup/:userid/:password', myController.signup);

router.get('/s3post', awsController.s3Upload);

router.get('/s3get',awsController.s3Get)

module.exports = router;