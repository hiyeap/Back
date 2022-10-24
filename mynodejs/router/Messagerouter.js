const { response } = require("express");
const express = require("express");
const Messagerouter = express.Router();
const conn = require("../config/DBConfig");

Messagerouter.get("/Message", (req, res) => {
  res.render("message", {
    user: req.session.user,
  });
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
      res.render("message", {
        user: req.session.user,
      });
    } else {
      console.log("검색실패 : " + err);
    }
  });
});

Messagerouter.get("/MessageLogout", (req, res) => {
  delete req.session.user;

  res.redirect("http://127.0.0.1:3000/Message");
});

Messagerouter.get("/MessageMember", (req, res) => {
  let email = req.query.email;
  let pw = req.query.pw;
  let tel = req.query.tel;
  let address = req.query.address;

  let sql = "select * from web_member";

  conn.query(sql, [email, pw, tel, address], (err, row) => {
    if (!err) {
      res.render("selectMember", {
        result: row,
        user: req.session.user,
      });
    } else {
      console.log("검색실패 : " + err);
    }
  });
});

module.exports = Messagerouter;
