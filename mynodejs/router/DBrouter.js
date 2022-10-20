const { response } = require("express");
const express = require("express");
const DBrouter = express.Router();
const conn = require("../config/DBConfig");

DBrouter.post("/login", (req, res) => {
  let id = req.body.id;
  let pw = req.body.pw;
  let sql = "select * from member where id=? and pw=?";
  conn.query(sql, [id, pw], (err, row) => {
    if (err) {
      console.log("검색실패 : " + err);
    } else if (row.length > 0) {
      // 로그인 성공
      // 1. LoginS.html-> ejs로 변환
      // 2. Login라우터에서 LoginS.ejs파일을 랜더링
      // 3. 랜더링할 때 로그인에 성공한 id값을 전송
      // 4. ejs파일에서 로그인에 성공한 id값을 출력!
      console.log("검색된 데이터의 수 : " + row.length);
      res.render("LoginS", {
        id: id,
      });
    } else if (row.length == 0) {
      // 로그인 실패
      res.redirect("http://127.0.0.1:5500/mynodejs/public/ex05loginF.html");
    }
  });
});

DBrouter.post("/JoinDB", (req, res) => {
  let id = req.body.id;
  let pw = req.body.pw;
  let nick = req.body.nick;

  let sql = "insert into member values (?, ?, ?)";

  conn.query(sql, [id, pw, nick], (err, row) => {
    if (!err) {
      console.log("입력성공 : " + row);
      res.redirect("http://127.0.0.1:5500/mynodejs/public/ex06Main.html");
    } else {
      console.log("입력실패 : " + err);
    }
  });
});

DBrouter.get("/Delete", (req, res) => {
  // 회원삭제 라우터 만들기
  // 1. get방식의 /Delete라우터 생성
  // 2. 사용자가 입력한 id값 가져오기
  // 3. id값을 통해 member테이블에 있는 id값 삭제하기
  // 4. 삭제성공 후 Main.html로 돌아가기
  let id = req.query.id;
  let sql = "delete from member where id=?";
  conn.query(sql, [id], (err, row) => {
    if (err) {
      console.log("삭제실패 : " + err);
    } else if (row.affectedRows > 0) {
      console.log("명령에 성공한 수 : " + row.affectedRows);
      res.redirect("http://127.0.0.1:5500/mynodejs/public/ex06Main.html");
    } else if (row.affectedRows == 0) {
      console.log("삭제된 값이 없습니다.");
    }
  });
});

DBrouter.post("/Update", (req, res) => {
  let id = req.body.id;
  let select = req.body.select;
  let data = req.body.data;

  let sql = `update member set ${select}=? where id=?`;
  conn.query(sql, [data, id], (err, row) => {
    if (err) {
      console.log("수정실패 : " + err);
    } else if (row.affectedRows > 0) {
      console.log("명령에 성공한 수 : " + row.affectedRows);
      res.redirect("http://127.0.0.1:5500/mynodejs/public/ex06Main.html");
    } else if (row.affectedRows == 0) {
      console.log("수정된 값이 없습니다.");
    }
  });
});

DBrouter.get("/SelectAll", (req, res) => {
  let sql = "select * from member";
  conn.query(sql, (err, row) => {
    if (err) {
      console.log("검색실패 : " + err);
    } else if (row.length > 0) {
      console.log("검색된 데이터의 수 : " + row.length);
      res.render("SelectAll", {
        row_names: row,
      });
    } else if (row.length == 0) {
      console.log("검색된 데이터가 없습니다.");
    }
  });
});

DBrouter.get("/SelectOne", (req, res) => {
  let id = req.query.id;
  let sql = "select * from member where id=?";
  conn.query(sql, [id], (err, row) => {
    if (err) {
      console.log("검색실패 : " + err);
    } else if (row.length > 0) {
      console.log("검색된 데이터의 수 : " + row.length);
      console.log(row);
      res.render("SelectOne", {
        row_name: row,
      });
    } else if (row.length == 0) {
      console.log("검색된 데이터가 없습니다.");
    }
  });
});

DBrouter.get("/SelectDelete", (req, res) => {
  let id = req.query.id;
  console.log(1);
  console.log(id);
  let sql = "delete from member where id=?";
  conn.query(sql, [id], (err, row) => {
    if (err) {
      console.log("삭제실패 : " + err);
    } else if (row.affectedRows > 0) {
      console.log("명령에 성공한 수 : " + row.affectedRows);
      res.redirect("http://127.0.0.1:5500/mynodejs/public/ex06Main.html");
    } else if (row.affectedRows == 0) {
      console.log("삭제된 값이 없습니다.");
    }
  });
});

module.exports = DBrouter;
