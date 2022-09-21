const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res)=> {
    fs.readFile('media/두꺼비.jpg', 'utf8', (err, image)=>{
        res.writeHead(200, {'Content-Type':'image/jpg'});
        res.end(image);
    });
});

server.listen(3000);