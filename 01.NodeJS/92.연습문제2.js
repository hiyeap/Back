// from.txt파일을 읽어서 to.txt 파일에 쓰는데,
// 첫번째 줄은 1번 반복, 두번째 줄은 2번 반복, ...
const fs = require('fs');

fs.readFile('07.File/tmp/from.txt', 'utf8', (err,data)=>{
    //console.log(data);
    const dataArray = data.split('\n').map(s => s.trim()); // \r 제거
    let output = '';
    dataArray.forEach((item,index)=>{
        line = '';
        for(let i = 0; i<index+1; i++){
            line += item;
        }
        if(index!=dataArray.length-1)
            output += line + '\n';
        else
            output += line;         // 마지막 줄엔 \n을 넣지 않는다.
    });
    fs.writeFile('07.File/tmp/to.txt', output, err =>{
        if(err)
            console.log(err);
    });

});