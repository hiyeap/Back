const express = require("express"); // 설치된 express 사용 선언
const app = express(); // express 실행 app 변수에 대입
const router = require("./router/router.js");
const DBrouter = require("./router/DBrouter.js");
const EJSrouter = require("./router/EJSrouter.js");
const Sessionrouter = require("./router/Sessionrouter.js");
const Messagerouter = require('./router/Messagerouter.js');
const Exrouter = require('./router/Exrouter');
const session = require("express-session"); // 세션 기능
const mysql_session = require("express-mysql-session"); // 세션이 저장되는 영역(mysql)
const bodyparser = require("body-parser");

app.set("view engine", "ejs");

const path = require("path");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("./public"));

let conn = {
  host: "localhost",
  user: "gisuser",
  password: "12345",
  port: 3306,
  database: "nodejs_db",
};

let conn_session = new mysql_session(conn);

app.use(
  session({
    secret: "smart",
    resave: false, // 저장
    saveUninitialized: true, // 초기화
    store: conn_session,
  })
); // 미들웨어로 session기능(저장위치 : mysql) 등록

app.use(bodyparser.urlencoded({ extended: false }));
// post방식일때 body영역을 분석해주는 미들웨어로 bodyparser등록

app.use(router); // 미들웨어로 router 등록
app.use(DBrouter);
app.use(EJSrouter);
app.use(Sessionrouter);
app.use(Messagerouter);
app.use(Exrouter);

app.listen(3000); // 현재 서버파일의 port번호설정
