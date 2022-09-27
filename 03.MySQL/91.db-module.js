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

    // 1. 걸그룹 리스트 조회(gid, 걸그룹 이름, 데뷔일, 히트곡명)
    getList: function (callback) {
        const conn = this.getConnection();
        const sql = `SELECT gid, name, DATE_FORMAT(debut, '%Y-%m-%d') AS debutDate, title
                        FROM girl_group, song
                        WHERE girl_group.hit_song_id = song.sid;`;
        conn.query(sql, (err, rows, fileds) => {
            if (err)
                throw err;
            callback(rows);
        });
        conn.end();
    },
    // 2. 송 리스트 조회(sid, 노래제목, 가사, 걸그룹명)
    getSongList : function(callback){
        const conn = this.getConnection();
        const sql = `SELECT sid, title, lyrics, name
                        FROM girl_group, song
                        WHERE girl_group.hit_song_id = song.sid;`;
        conn.query(sql, (err, rows, fileds)=>{
            if(err)
                throw err;
            callback(rows);
        });
        conn.end();
    },

    // 3. gid로 걸그룹 검색(gid, 걸그룹이름, 데뷔일, 히트곡명)
    selectGid : function(params, callback){
        const conn = this.getConnection();
        const sql = `SELECT gid, name, DATE_FORMAT(debut, '%Y-%m-%d') AS debutDate, title
                        FROM girl_group, song
                        WHERE girl_group.hit_song_id = song.sid
                        AND gid = ?;`;
        conn.query(sql, params, (err, rows, fields)=>{
            if(err)
                throw err;
            callback(rows);
        });
        conn.end();
    },

    // 4. sid로 송 검색(sid, 노래제목, 가사, 걸그룹명)
    selectSid : function(params, callback){
        const conn = this.getConnection();
        const sql = `SELECT sid, title, lyrics, name
                        FROM girl_group, song
                        WHERE girl_group.hit_song_id = song.sid
                        AND song.sid = ?;`;
        conn.query(sql, params, (err, rows, fields)=>{
            if(err)
                throw err;
            callback(rows);
        });
        conn.end();
    },

    // 5-0. 걸그룹 전체리스트
    getAllList: function(callback){
        const conn = this.getConnection();
        const sql = `SELECT * FROM girl_group`;
        conn.query(sql, (err, rows, fields)=>{
            if(err)
                throw err;
            callback(rows);
        });
        conn.end();
    },

    // 5. 걸그룹 추가
    insertGirlGroup : function(params, callback){
        const conn =  this.getConnection();
        const sql = `INSERT INTO girl_group (name, debut, hit_song_id)
                        VALUES (?, ?, ?);`;
        conn.query(sql, params, (err, fields)=>{
            if(err)
                throw err;
            callback();
        });
        conn.end();
    },

    // 6. 걸그룹 수정
    updateGirlGroup : function(params, callback){
        const conn = this.getConnection();
        const sql = `UPDATE girl_group SET name=? WHERE name=?;`;
        conn.query(sql, params, (err, fields)=>{
            if(err)
                throw err;
            callback();
        });
        conn.end();
    },
    // 7. 걸그룹 삭제
    deleteGirlGroup : function(params, callback){
        const conn = this.getConnection();
        const sql = `DELETE FROM girl_group WHERE name=?;`;
        conn.query(sql, params, (err, fields)=>{
            if(err)
                throw err;
            callback();
        });
        conn.end();
    },

    // 8-0. 송 전체리스트
    getAllSongList : function(callback){
        const conn = this.getConnection();
        const sql = `SELECT * FROM song;`;
        conn.query(sql, (err, rows, fields)=>{
            if(err)
                throw err;
            callback(rows);
        })
        conn.end();
    },

    // 8. 송 추가
    insertSong : function(params, callback){
        const conn = this.getConnection();
        const sql = `INSERT INTO song VALUES (?, ?, ?);`;
        conn.query(sql, params, (err, fields)=>{
            if(err)
                throw err;
            callback();
        })
        conn.end();
    },

    // 9. 송 수정
    updateSong : function(params, callback){
        const conn = this.getConnection();
        const sql = `UPDATE song SET title=? WHERE title=?;`;
        conn.query(sql, params, (err, fields)=>{
            if(err)
                throw err;
            callback();
        });
        conn.end();
    },
    
    // 10. 송 삭제
    deleteSong : function(params, callback){
        const conn = this.getConnection();
        const sql = `DELETE FROM song WHERE title=?;`;
        conn.query(sql, params, (err, fields)=>{
            if(err)
                throw err;
            callback();
        });
        conn.end();
    }
}