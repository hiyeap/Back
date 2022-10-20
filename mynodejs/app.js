const express = require("express"); // 설치된 express 사용 선언
const app = express(); // express 실행 app 변수에 대입
const router = require("./router/router.js");
const DBrouter = require("./router/DBrouter.js");
const EJSrouter = require("./router/EJSrouter.js");

const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({ extended: false }));
// post방식일때 body영역을 분석해주는 미들웨어로 bodyparser등록

app.use(router); // 미들웨어로 router 등록
app.use(DBrouter);
app.use(EJSrouter);

app.listen(3000); // 현재 서버파일의 port번호설정
