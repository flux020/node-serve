    // 实现与MySQL交互
    var mysql = require('mysql');
    var $conf = require('../conf/db');
    var $util = require('../util/util');
    var $sql = require('./postSqlMapping');

    // 使用连接池，提升性能
    var pool = mysql.createPool($util.extend({}, $conf.mysql));

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

    module.exports = {
        query: function (req, res, next) {
            pool.getConnection(function (err, connection) {

                // 建立连接，向表中插入值
                // 'INSERT INTO post(id, title, content) VALUES(0,?,?)',
                connection.query($sql.queryAll, function (err, result) {
                    if (result) {
                        result = {
                            code: 200,
                            msg: '查询成功',
                            data: {
                                ...result
                            }
                        };
                    }

                    // 以json形式，把操作结果返回给前台页面
                    jsonWrite(res, result);

                    // 释放连接
                    connection.release();
                });
            });
        },
        addUser: function (req, res, next) {
            pool.getConnection(function (err, connection) {
                var param = req.body;
                connection.query($sql.insert, [param.userName,param.password],function (err, result) {
                    if (result) {
                        result = {
                            code: 200,
                            msg: '新增成功',
                            data: {
                                id:result.insertId
                            }
                        };
                    }
                    // 以json形式，把操作结果返回给前台页面
                    jsonWrite(res, result);

                    // 释放连接
                    connection.release();
                })
            })
        },
        delUser: function (req, res, next) {
            pool.getConnection(function (err, connection) {
                var param = req.body;
                connection.query($sql.delete, param.id, function (err, result) {
                    if (result) {
                        result = {
                            code: 200,
                            msg: '删除成功',
                        };
                    }
                    // 以json形式，把操作结果返回给前台页面
                    jsonWrite(res, result);

                    // 释放连接
                    connection.release();
                })
            })
        },
        editUser: function (req, res, next) {
            pool.getConnection(function (err, connection) {
                var param = req.body;
                connection.query($sql.update,[param.userName,param.password,param.id], function (err, result) {

                    if (result) {
                        result = {
                            code: 200,
                            msg: '更新成功',
                        };
                    }
                    // 以json形式，把操作结果返回给前台页面
                    jsonWrite(res, result);

                    // 释放连接
                    connection.release();
                })
            })
        },
    };