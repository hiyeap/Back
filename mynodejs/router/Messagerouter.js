const { response } = require("express");
const express = require("express");
const Messagerouter = express.Router();
const conn = require("../config/DBConfig");

Messagerouter.get("/Message", (req, res) => {
  // 현재 로그인한 사람에게 온 메세지를 검색
  let sql = "select * from web_message where rec=?";
  if (req.session.user) {
    conn.query(sql, [req.session.user.email], (err, row) => {
      console.log(row);

      res.render("message", {
        user: req.session.user,
        row_name: row,
      });
    });
  } else {
    res.render("message", {
      user: req.session.user,
    });
  }
});

Messagerouter.post("/MessageJoin", (req, res) => {
  let email = req.body.email;
  let pw = req.body.pw;
  let tel = req.body.tel;
  let address = req.body.address;

  let sql = "insert into web_member values (?, ?, ?, ?, now())";

  conn.query(sql, [email, pw, tel, address], (err, row) => {
    if (!err) {
      console.log("입력성공 : " + row);
      res.redirect("http://127.0.0.1:3000/Message");
    } else {
      console.log("입력실패 : " + err);
    }
  });
});

// Login 기능을 구현하시오.
// 1. message.ejs에 form 수정
// 2. MessageLogin 라우터를 구현
// 3. 로그인 성공 후 Message 페이지로 이동

Messagerouter.post("/MessageLogin", (req, res) => {
  let email = req.body.email;
  let pw = req.body.pw;

  let sql = "select * from web_member where email=? and pw=?";

  conn.query(sql, [email, pw], (err, row) => {
    if (!err) {
      req.session.user = {
        email: row[0].email,
        tel: row[0].tel,
        address: row[0].address,
      };
      res.redirect("http://127.0.0.1:3000/Message");
    } else {
      console.log("검색실패 : " + err);
    }
  });
});

Messagerouter.get("/MessageUpdate", (req, res) => {
  // update.ejs 파일을 렌더링
  res.render("update", {
    user: req.session.user,
  });
});

Messagerouter.post("/MessageUpdateExe", (req, res) => {
  let email = req.session.user.email;
  let pw = req.body.pw;
  let tel = req.body.tel;
  let address = req.body.address;

  // 사용자가 입력한 pw, tel, address로 email의 정보를 수정하시오.
  let sql = "update web_member set pw=?, tel=?, address=? where email=?";

  conn.query(sql, [pw, tel, address, email], (err, row) => {
    if (!err) {
      console.log("수정성공 : " + row);
      res.redirect("http://127.0.0.1:3000/Message");
    } else {
      console.log("수정실패 : " + err);
    }
  });
});

Messagerouter.get("/MessageLogout", (req, res) => {
  delete req.session.user;

  res.redirect("http://127.0.0.1:3000/Message");
});

Messagerouter.get("/MessageMemberSelect", (req, res) => {
  let sql = "select * from web_member";

  conn.query(sql, (err, row) => {
    if (!err) {
      res.render("selectMember", {
        row_name: row,
        user: req.session.user,
      });
    } else {
      console.log("검색실패 : " + err);
    }
  });
});

Messagerouter.get("/MessageDelete", (req, res) => {
  let email = req.query.email;
  console.log(email);
  let sql = "delete from web_member where email=?";
  conn.query(sql, [email], (err, row) => {
    if (!err) {
      res.redirect("http://127.0.0.1:3000/MessageMemberSelect");
    } else {
      console.log("삭제실패 : " + err);
    }
  });
});

Messagerouter.post("/MessageSend", (req, res) => {
  let send = req.body.send;
  let rec = req.body.rec;
  let content = req.body.content;

  let sql =
    "insert into web_message(send, rec, content, send_date) values (?, ?, ?, now())";

  conn.query(sql, [send, rec, content], (err, row) => {
    if (!err) {
      console.log("입력성공 : " + row);
      res.redirect("http://127.0.0.1:3000/Message");
    } else {
      console.log("입력실패 : " + err);
    }
  });
});

module.exports = Messagerouter;
