var express = require('express');
var sqlite = require('sqlite3');
var router = express.Router();

var emails = new sqlite.Database('../emails.db');
var date = new Date();
var sqlname = "emails_" + (date.getYear() + 1900) + "_" + ((date.getMonth() + 1) < 7 ? "1" : "2");

/* GET listings. */
router.get('/', function(req, res) {
    console.log(req.body);

    var emailHTMLCode = "<link href='//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css' rel='stylesheet'>" +
        "<table style='width: 100%%; margin: 0; padding: 0;' class='table table-striped'>" +
        "<tr> <th>ID</th> <th>Name</th> <th>Email</th> <th>From</th> <th>Info</th> </tr>"

    emails.each('SELECT DISTINCT * FROM ' + sqlname + " group by EMAIL", function(err, row) {
        emailHTMLCode +=
        "<td>" + row.id + "</td>" +
        "<td>" + row.name + "</td>" +
        "<td>" + row.email + "</td>" +
        "<td>" + row.comesfrom + "</td>" +
        "<td>" + row.info + "</td>" +
        "</tr>"
    }, function(err, rows) {
        emailHTMLCode += "</table>"
        res.send(emailHTMLCode);
    });


});

module.exports = router;
