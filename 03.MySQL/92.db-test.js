const dm = require('./91.db-module');

/*
dm.getList(rows=> {
    for (let row of rows){
        console.log(row.gid, row.name, row.debutDate, row.hit_song_id);
    }
}); 

dm.getSongList(rows=>{
    for (let row of rows){
        console.log(row.sid, row.title, row.lyrics, row.name);
    }
});

dm.selectGid(1001, rows=>{
    for (let row of rows){
        console.log(row.gid, row.name, row.debutDate, row.title);
    }
});

dm.selectSid(101, rows => {
    for (let row of rows) {
        console.log(row.sid, row.title, row.lyrics, row.name);
    }
});

dm.insertGirlGroup(['Yena', '2022-09-27', 123], ()=>{
    dm.getAllList(rows=>{
        for (let row of rows){
            console.log(row.gid, row.name, row.debut, row.hit_song_id);
        }
    });
});

dm.updateGirlGroup(['CHOI YENA', 'Yena'], ()=>{
    dm.getAllList(rows=>{
        for(let row of rows){
            console.log(row.gid, row.name, row.debut, row.hit_song_id);
        }
    });
});

dm.deleteGirlGroup(['CHOI YENA'], ()=>{
    dm.getAllList(rows=>{
        for(let row of rows){
            console.log(row.gid, row.name, row.debut, row.hit_song_id);
        }
    });
});

dm.insertSong([117, 'SMILEY', 'Just Smile away'], ()=>{
    dm.getAllSongList(rows=>{
        for(let row of rows){
            console.log(row.sid, row.title, row.lyrics);
        }
    });
});

dm.updateSong(['SMARTPHONE', 'SMILEY'], ()=>{
    dm.getAllSongList(rows=>{
        for(let row of rows){
            console.log(row.sid, row.title, row.lyrics);
        }
    });
}); */

dm.deleteSong('SMARTPHONE', ()=>{
    dm.getAllSongList(rows=>{
        for(let row of rows){
            console.log(row.sid, row.title, row.lyrics);
        }
    });
});