const express = require("express");
const router = express.Router(); // express가 갖고 있는 기능 중 router 기능 사용
const conn = require('../config/DBConfig');

router.get("/plus", function (req, res) {
  // plus라우터 기능정의 및 등록
  console.log("/plus 라우터 호출");
  console.log(parseInt(req.query.num1) + parseInt(req.query.num2));
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.write("<html>");
  res.write("<body>");
  res.write("응답성공<br>");
  res.write(
    "결과값 : " + (parseInt(req.query.num1) + parseInt(req.query.num2))
  );
  res.write("</body>");
  res.write("</html>");
  res.end();
});

router.get("/cal", (req, res) => {
  // cal라우터 기능정의 및 등록
  let num1 = parseInt(req.query.num1);
  let num2 = parseInt(req.query.num2);
  let cal = req.query.cal;
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.write("<html>");
  res.write("<body>");
  if (cal == "+") {
    res.write("결과값 : " + (num1 + num2));
  } else if (cal == "-") {
    res.write("결과값 : " + (num1 - num2));
  } else if (cal == "*") {
    res.write("결과값 : " + num1 * num2);
  } else if (cal == "/") {
    res.write("결과값 : " + num1 / num2);
  }
  res.write("</body>");
  res.write("</html>");
  res.end();
});

router.post("/grade", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.write("<html>");
  res.write("<body>");
  res.write("name : " + req.body.name + "<br>");
  res.write("java : " + req.body.java + "<br>");
  res.write("web : " + req.body.web + "<br>");
  res.write("iot : " + req.body.iot + "<br>");
  res.write("android : " + req.body.android + "<br>");
  let avg =
    (parseInt(req.body.java) +
      parseInt(req.body.web) +
      parseInt(req.body.web) +
      parseInt(req.body.android)) /
    4;
  res.write("avg : " + avg + "<br>");
  let grade = "-";
  if (avg >= 95) {
    grade = "A+";
  } else if (avg >= 90) {
    grade = "A";
  } else if (avg >= 85) {
    grade = "B+";
  } else if (avg >= 80) {
    grade = "B";
  } else if (avg >= 75) {
    grade = "C";
  } else {
    grade = "F";
  }
  res.write("grade : " + grade);
  res.write("</body>");
  res.write("</html>");
  res.end();
});

router.post("/join", (req, res) => {
  console.log("JOIN");
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.write("<html>");
  res.write("<body>");
  res.write("ID :" + req.body.id + "<br>");
  res.write("NAME :" + req.body.name + "<br>");
  res.write("EMAIL :" + req.body.email + "<br>");
  res.write("TEL :" + req.body.tel + "<br>");
  res.write("GENDER :" + req.body.gender + "<br>");
  res.write("COUNTRY :" + req.body.country + "<br>");
  res.write("BIRTH :" + req.body.birth + "<br>");
  res.write("COLOR :" + req.body.color + "<br>");
  res.write("HOBBY :" + req.body.hobby + "<br>");
  res.write("TALK :" + req.body.talk + "<br>");
  res.write("</body>");
  res.write("</html>");
  res.end();
});

router.post("/login", (req, res) => {
  let id = req.body.id;
  let pw = req.body.pw;
  let sql = "select * from member where id=? and pw=?";
  conn.query(sql, [id, pw], (err, row)=>{
    if (err) {
      console.log("검색실패 : " + err);
    } else if (row.length > 0) {
      // 로그인 성공
      console.log("검색된 데이터의 수 : " + row.length);
      res.redirect("http://127.0.0.1:5500/mynodejs/public/ex05loginS.html");
    } else if(row.length ==0){
      // 로그인 실패
      res.redirect("http://127.0.0.1:5500/mynodejs/public/ex05loginF.html");
    }
  })
});

router.post("/JoinDB", (req, res) => {
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

// 회원삭제 라우터 만들기
// 1. get방식의 /Delete라우터 생성
// 2. 사용자가 입력한 id값 가져오기
// 3. id값을 통해 member테이블에 있는 id값 삭제하기
// 4. 삭제성공 후 Main.html로 돌아가기
router.get("/Delete", (req, res) => {
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

router.post("/Update", (req, res) => {
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

router.get("/SelectAll", (req, res) => {
  let sql = "select * from member";

  conn.query(sql, (err, row) => {
    if (err) {
      console.log("검색실패 : " + err);
    } else if (row.length > 0) {
      console.log("검색된 데이터의 수 : " + row.length);
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.write("<html>");
      res.write("<body>");
      res.write("<table border='1'>");
      res.write("<tr>");
      res.write("<th>ID</th>");
      res.write("<th>PW</th>");
      res.write("<th>NICK</th>");
      res.write("</tr>");
      for (let i = 0; i < row.length; i++) {
        res.write("<tr>");
        res.write("<td>" + row[i].id + "</td>");
        res.write("<td>" + row[i].pw + "</td>");
        res.write("<td>" + row[i].nick + "</td>");
        res.write("</tr>");
      }
      res.write("</table>");
      res.write("</body>");
      res.write("</html>");
      res.end();
    } else if (row.length == 0) {
      console.log("검색된 데이터가 없습니다.");
    }
  });
});

router.get("/SelectOne", (req, res) => {
  let id = req.query.id;
  let sql = "select * from member where id=?";
  conn.query(sql, [id], (err, row) => {
    if (err) {
      console.log("검색실패 : " + err);
    } else if (row.length > 0) {
      console.log("검색된 데이터의 수 : " + row.length);
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.write("<html>");
      res.write("<body>");
      for (let i = 0; i < row.length; i++) {
        res.write("<h3>사용자가 입력한 id : " + row[i].id + "</h3>");
        res.write("<p> pw : " + row[i].pw + "</p>");
        res.write("<p> nick : " + row[i].nick + "</p>");
      }
      res.write("</body>");
      res.write("</html>");
      res.end();
    } else if (row.length == 0) {
      console.log("검색된 데이터가 없습니다.");
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.write("<html>");
      res.write("<body>");
      res.write("<p>검색된 데이터가 없습니다.</p>");
      res.write("</body>");
      res.write("</html>");
      res.end();
    }
  });
});

module.exports = router;
