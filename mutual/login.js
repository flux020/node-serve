var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
// var $sql = require('./postSqlMapping');

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    });
  } else {
    res.json(ret);
  }
};

// 使用连接池，提升性能
var pool = mysql.createPool($util.extend({}, $conf.mysql));

module.exports = {
  login: (req, res, next) => {
    pool.getConnection((err, connection) => {
      var params = req.body;
      let sql = "select * from user WHERE userName=? and password=?"
      connection.query(sql, [params.userName, params.password], (err, result) => {
        if (!result.length) {
          result = {
            code: -1,
            msg: '用户名或密码错误'
          };
        }else{
          result = {
            code: 200,
            msg: '登录成功'
          };
        }
        jsonWrite(res, result);
        connection.release();
      })
    })
  }
}