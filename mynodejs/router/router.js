const express = require("express");
const router = express.Router(); // express가 갖고 있는 기능 중 router 기능 사용

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

module.exports = router;
