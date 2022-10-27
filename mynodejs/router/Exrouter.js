const express = require("express");
const Exrouter = express.Router();

Exrouter.get("/ex01", (req, res) => {
  const name = req.query.name;
  const season = req.query.season;
  res.render("ex01", {
    name: name,
    season: season,
  });
});

Exrouter.post("/ex02login", (req, res) => {
  const id = req.body.id;
  const pw = req.body.pw;
  console.log(id);
  const eid = "smart";
  const epw = "1234";

  if (id === eid && pw === epw) {
    req.session.user ={
      id : eid
    }
    res.render("ex02", {
      user: req.session.user
    });
  } else {
    res.redirect("http://127.0.0.1:5500/Nodejs/mynodejs/public/ex02.html");
  }
});

Exrouter.get("/logout", (req, res) => {
  delete req.session.id;

  res.redirect("http://127.0.0.1:5500/Nodejs/mynodejs/public/ex02.html");
});

module.exports = Exrouter;
