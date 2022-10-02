/* npm install mysql
alter user 'gisuser'@'%' identified with mysql_native_password by '12345';
*/

config = {
    host: 'localhost',
    user: 'gisuser',
    password : '12345',
    port: 3306,
    database: 'world'           // use world;
}


const fs = require('fs');
fs.writeFile('mysql.json', JSON.stringify(config), err=>{

});
