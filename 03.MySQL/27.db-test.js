const dm = require('./26.db-module');

/*
dm.getList(rows=> {
    for (let row of rows){
        console.log(row.id, row.player, row.backNo, row.position);
    }
}); 

dm.insertPlayer(['테스트', 100, '포지션'], () => {
    dm.getList(rows => {
        for (let row of rows) {
            console.log(row.id, row.player, row.backNo, row.position);
        }
    });
});

dm.getPlayer(1, rows => {
    for (let row of rows) {
        console.log(row.id, row.player, row.backNo, row.position);
    }
});

dm.updatePlayer(['테스트2', 999, '포지션2', 16], () => {
    dm.getPlayer(16, rows => {
        for (let row of rows) {
            console.log(row.id, row.player, row.backNo, row.position);
        }
    });
});

dm.deletePlayer(16, ()=>{
    dm.getList(rows=>{
        for(let row of rows){
            console.log(row.id, row.player, row.backNo, row.position);
        }
    });
});

dm.getPlayerByPosition('투수', rows=>{
    for(let row of rows){
        console.log(row.id, row.player, row.backNo, row.position);
    }
});

dm.getPlayersOrderByBackNo(1, rows=>{
    for(let row of rows){
        console.log(row.id, row.player, row.backNo, row.position);
    }
}); */

dm.getPlayersByOrder('id', 0, rows=>{
    for(let row of rows){
        console.log(row.id, row.player, row.backNo, row.position);
    }
});