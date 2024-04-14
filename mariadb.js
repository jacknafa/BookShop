const mariadb = require('mysql2'); // mysql 모듈 소환

const connection = mariadb.createConnection({ // DB와 연결 통로 생성
    host : 'localhost',
    port : 3307,
    user : 'root',
    password : 'root',
    database : 'Bookshop',
    dateStrings : true
});

module.exports = connection;