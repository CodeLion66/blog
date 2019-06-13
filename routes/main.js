var express = require('express');
var router = express.Router();
var Member = require('../models/member');
var Tags = require('../models/tags');
var Article = require('../models/article');
var { sendJson, errCode, util } = require('../common/index');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', (req, res) => {
  let {username, password} = req.body;

  if (!username) {
      sendJson(res, errCode.ERROR_FORMAT_PARAMS);
      return;
  }
  if (!password) {
      sendJson(res, errCode.ERROR_FORMAT_PARAMS);
      return;
  }
  Member.findOne({
      username,
      password: util.md5(password)
  }).then(userInfo => {
      if (userInfo) {
          //登录成功
          let data = {};
          data.username = userInfo.username;
          data.userType = userInfo.type;
          data.userId = userInfo._id;
          //登录成功后设置session
          req.session.userInfo = data;

          sendJson(res, errCode.SUCCESS, data);
          return;
      }
      sendJson(res, errCode.INVALID_ACCOUNT_OR_PWD);

  }).catch(err => {
    sendJson(res, errCode.HTTP_INTERNAL_SERVER_ERROR);
  });
});

router.post('/register', (req, res) => {
  let {userName, password, passwordRe} = req.body;
  if (!userName) {
    sendJson(res, errCode.ERROR_FORMAT_PARAMS);
      return;
  }
  if (!password) {
    sendJson(res, errCode.ERROR_FORMAT_PARAMS);
      return;
  }
  if (password !== passwordRe) {
    sendJson(res, errCode.ERROR_FORMAT_PARAMS);
      return;
  }
  // 验证用户是否已经在数据库中
  Member.findOne({username: userName})
      .then(data => {
          if (data) {
            sendJson(res, errCode.ACCOUNT_BEEN_REGISTERED);
            return;
          }
          // 保存到数据库
          let member = new Member({
              username: userName,
              password: util.md5(password),
              type: 'user'
          });
          member.save()
              .then(function () {
                Member.findOne({username: userName})
                      .then(userInfo=>{
                          let data = {};
                          data.username = userInfo.username;
                          data.userType = userInfo.type;
                          data.userId = userInfo._id;
                          sendJson(res, errCode.SUCCESS, data);
                          return;
                      });
              })
      }).catch(err => {
        sendJson(res, errCode.HTTP_INTERNAL_SERVER_ERROR);
      return;
  });
});

// 用户验证
router.get('/userInfo',function (req,res) {
  let data = {user: req.session.userInfo};

  if (data.user) {
    sendJson(res, errCode.SUCCESS, data);
  } else {
    sendJson(res, errCode.SUCCESS);
  }
});

router.get('/logout', function (req,res) {
  req.session.destroy();
  res.redirect('/');
});

// 获取全部标签
router.get('/getAllTags', function (req, res) {
  Tags.find(null, 'name').then(data => {
    sendJson(res, errCode.SUCCESS, data);
  }).catch(err => {
    sendJson(res, errCode.HTTP_INTERNAL_SERVER_ERROR);
  })
});


// 获取文章
router.get('/getArticles', function (req, res) {
  let tag = req.query.tag || null;
  let isPublish = req.query.isPublish;
  let searchCondition = {
      isPublish,
  };
  if (tag) {
      searchCondition.tags = tag;
  }
  if (isPublish === 'false') {
      searchCondition = null
  }
  let skip = (req.query.pageNum - 1) < 0 ? 0 : (req.query.pageNum - 1) * 5;
  let data = {
      total: 0,
      list: []
  };
  Article.count(searchCondition)
      .then(count => {
          data.total = count;
          Article.find(searchCondition, '_id title isPublish author viewCount commentCount time coverImg', {
              skip: skip,
              limit: 5
          })
              .then(result => {
                  data.list = result;
                  sendJson(res, errCode.SUCCESS, data);
              }).cancel(err => {
              throw err
          })
      }).cancel(err => {
        sendJson(res, errCode.HTTP_INTERNAL_SERVER_ERROR);
  });
});

// 获取文章详情
router.get('/getArticleDetail', (req, res) => {
  let _id = req.query.id;

  Article.findOne({_id})
    .then(data => {
      data.viewCount = data.viewCount + 1;
      Article.update({_id},{viewCount:data.viewCount})
        .then(result=>{
          sendJson(res, errCode.SUCCESS, data);
        }).cancel(err => {
          sendJson(res, errCode.HTTP_INTERNAL_SERVER_ERROR);
        });
      }).cancel(err => {
        sendJson(res, errCode.HTTP_INTERNAL_SERVER_ERROR);
      });
});
  
module.exports = router;
