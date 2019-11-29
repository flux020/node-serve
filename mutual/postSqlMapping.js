// SQL语句
var post = {
  insert:'INSERT INTO user (userName, password) VALUES(?,?)',
  update:'update user set userName=?, password=? where id=?',
  delete: 'delete from user where id=?',
  queryById: 'select * from user where id=?',
  queryAll: 'select * from user'
};

module.exports = post;