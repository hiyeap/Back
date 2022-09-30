const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const dm = require('./db/tigers-module');
const pm = require('path');            // path module

const app = express();
const path = pm.join(__dirname, 'views/common');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

const createRouter = express.Router();
const updateRouter = express.Router();
const deleteRouter = express.Router();
const deleteConfirmRouter = express.Router();

app.use('/create', createRouter);
app.use('/update', updateRouter);
app.use('/delete', deleteRouter);
app.use('/deleteConfirm', deleteConfirmRouter);



app.get('/', (req, res) => {
    const menu = {ho:1, cr:0, up:0}
    dm.getList(rows => {
        ejs.renderFile('views/32.index.ejs', { 
            menu, path, rows              // {menu:menu, path:path, rows:rows}
        }, (err, html) => {
            res.send(html);
        });
    });
});

createRouter.get('/', (req, res) => {
    const menu = {ho:0, cr:1, up:0}
    ejs.renderFile('views/32.create.ejs', {
        menu, path
    }, (err, html) => {
        res.send(html);
    });
});

app.post('/create', (req, res) => {
    const player = req.body.player;
    const backNo = parseInt(req.body.backNo);
    const position = req.body.position;
    dm.insertPlayer([player, backNo, position], () => {
        res.redirect('/');
    });
});

updateRouter.get('/:id', (req, res) => {        // http://localhost:3000/update/123
    const menu = {ho:0, cr:0, up:1}
    const id = parseInt(req.params.id);
    dm.getPlayer(id, rows => {
        const player = rows[0].player;
        const backNo = parseInt(rows[0].backNo);
        const position = rows[0].position;
        ejs.renderFile('views/32.update.ejs', {
            menu, path, id, player, backNo, position    // {menu:menu, path:path, id:id, player:player, backNo:backNo, position:position}
        }, (err, html) => {
            res.send(html);
        });
    });
});

app.post('/update', (req, res) => {
    const player = req.body.player;
    const backNo = parseInt(req.body.backNo);
    const position = req.body.position;
    const id = parseInt(req.body.id);
    dm.updatePlayer([player, backNo, position, id], () => {
        res.redirect('/');
    });
});

deleteRouter.get('/:id', (req, res) => {        // http://localhost:3000/delete/123
    const id = parseInt(req.params.id);
    ejs.renderFile('views/32.delete.ejs', {
        id
    }, (err, html)=>{
        res.send(html);
    });
});

deleteConfirmRouter.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    dm.deletePlayer(id, () => {
        res.redirect('/');
    });
});

app.get("*", (req, res) => {
    res.status(404).send('Path not found.');
});

app.listen(3000, (req, res) => {
    console.log('Server is running at http://127.0.0.1:3000');
});