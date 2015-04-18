var express = require('express');
var sqlite = require('sqlite3');
var router = express.Router();

var emails = new sqlite.Database('../emails.db');
var date = new Date();
var sqlname = "emails_" + (date.getYear() + 1900) + "_" + ((date.getMonth() + 1) < 7 ? "1" : "2");

/* GET listings. */
router.get('/', function(req, res) {
    var count = 0;
    var emailData = [];

    emails.each('SELECT DISTINCT * FROM ' + sqlname + " GROUP BY EMAIL ORDER BY ID ASC", function(err, row) {
        emailData.push({id : row.id, name : row.name, email : row.email, comesfrom : row.comesfrom, info : row.info});
        count ++;
    }, function(err, rows) {
        res.render("admin",{titleCount: count, emails : emailData});
    });
});

module.exports = router;
