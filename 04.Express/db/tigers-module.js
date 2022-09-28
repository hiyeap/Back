const mysql = require('mysql');
const config = require('./mysql.json');

module.exports = {
    getConnection: function () {
        const conn = mysql.createConnection(config);
        conn.connect(err => {
            if (err) {
                console.log('mysql connection error');
                console.log(err);
            }
        });
        return conn;
    },
    getList: function (callback) {
        const conn = this.getConnection();
        const sql = `SELECT * FROM tigers WHERE isDeleted=0;`;
        conn.query(sql, (err, rows, fileds) => {
            if (err)
                throw err;
            callback(rows);
        });
        conn.end();
    },
    insertPlayer: function (params, callback) {
        const conn = this.getConnection();
        const sql = `INSERT INTO tigers (player, backNo, POSITION) 
                        VALUES (?, ?, ?);`;
        conn.query(sql, params, (err, fields) => {
            if (err)
                throw err;
            callback();
        });
        conn.end();
    },
    getPlayer: function (params, callback) {
        const conn = this.getConnection();
        const sql = `SELECT * FROM tigers 
                        WHERE id=? and isDeleted=0;`;
        conn.query(sql, params, (err, rows, fields) => {
            if (err)
                throw err;
            callback(rows);
        });
        conn.end();
    },
    updatePlayer: function (params, callback) {
        const conn = this.getConnection();
        const sql = `UPDATE tigers SET player=?, backNo=?, position=?
                        WHERE id=?;`;
        conn.query(sql, params, (err, fields) => {
            if (err)
                throw err;
            callback();
        });
        conn.end();
    },
    deletePlayer: function (params, callback) {
        const conn = this.getConnection();
        const sql = `UPDATE tigers SET isDeleted=1 WHERE id=?;`;
        conn.query(sql, params, (err, fields) => {
            if (err)
                throw err;
            callback();
        });
        conn.end();
    },
    getPlayerByPosition: function (params, callback) {        // 필요한 파라미터
        const conn = this.getConnection();
        const sql = `SELECT * FROM tigers 
                        WHERE position=?;`;
        conn.query(sql, params, (err, rows, fields) => {
            if (err)
                throw err;
            callback(rows);                                 // 콜백 파라미터
        });
        conn.end();
    },
    getPlayersOrderByBackNo: function (order, callback) {
        const conn = this.getConnection();
        let sql = `SELECT * FROM tigers
                        WHERE isDeleted=0
                        ORDER BY backNo `;
        sql += (order == 1) ? 'DESC;' : ';';
        conn.query(sql, (err, rows, fields) => {
            if (err)
                throw err;
            callback(rows);
        });
        conn.end();
    },
    getPlayersByOrder: function(field, order, callback){
        const conn = this.getConnection();
        let sql = `SELECT * FROM tigers
                        WHERE isDeleted=0
                        ORDER BY ${field} `;
        sql += (order == 1) ? 'DESC;' : ';';
        conn.query(sql, (err, rows, fields) => {
            if (err)
                throw err;
            callback(rows);
        });
        conn.end();
    }
}