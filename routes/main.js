var express = require('express');
var router = express.Router();
var Tags = require('../models/tags');
var Article = require('../models/article');
var { sendJson, errCode } = require('../common/index');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//获取全部标签
router.get('/getAllTags', function (req, res) {
  Tags.find(null, 'name').then(data => {
    sendJson(res, errCode.SUCCESS, data);
  }).catch(err => {
    sendJson(res, errCode.HTTP_INTERNAL_SERVER_ERROR);
  })
});
  
module.exports = router;
