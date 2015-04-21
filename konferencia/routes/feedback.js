var express = require('express');
var sqlite = require('sqlite3');
var router = express.Router();

var TABLENAME = 'feedback12';

var db = new sqlite.Database('../feedback.db');
db.run('CREATE TABLE IF NOT EXISTS ' + TABLENAME +' (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, feedback TEXT);');


router.get('/', function(req, res) {

    res.render("feedback");
});

router.post('/', function(req, res) {
    if (req.body.name === '' || req.body.email === '' || req.body.text === '') {
        console.log("error");
    } else {
        var stmt = db.prepare('INSERT INTO ' + TABLENAME + ' (name, email, feedback) VALUES (?, ?, ?)');

        stmt.run(req.body.name, req.body.email, req.body.text);
        stmt.finalize();
    }

    res.send(200).end();
});

module.exports = router;