//
// SQL语句封裝
var user = {
    insert:'INSERT INTO mydb(id, name, age) VALUES(?,?,?)',
    update:'UPDATE mydb SET name=?, age=? WHERE id=?',
    delete: 'DELETE FROM mydb WHERE id=?',
    queryById: 'SELECT * FROM user WHERE id=?',
    queryAll: 'SELECT * FROM user'
};
module.exports = user;