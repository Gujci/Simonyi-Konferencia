var express = require('express');
var sqlite = require('sqlite3');
var router = express.Router();

var emails = new sqlite.Database('../emails.db');
var feedbacks = new sqlite.Database('../feedback.db');

var date = new Date();
var EMAILS_TABLE = "emails_" + (date.getYear() + 1900) + "_" + ((date.getMonth() + 1) < 7 ? "1" : "2");
var FEEDBACK_TABLE = "feedback12";

/* GET listings. */
router.get('/', function(req, res) {
    var count = 0;
    var emailData = [];
    var feedbackData = [];

    emails.each('SELECT DISTINCT * FROM ' + EMAILS_TABLE + " GROUP BY EMAIL ORDER BY ID ASC", function(err, row) {
        emailData.push({id : row.id, name : row.name, email : row.email, comesfrom : row.comesfrom, info : row.info});
        count ++;
    }, function(err, rows) {
        feedbacks.each('SELECT * FROM ' + FEEDBACK_TABLE, function(err, row){
            feedbackData.push({name: row.name, email: row.email, text: row.feedback});
        },function(err, rows) {
            res.render("admin",{titleCount: count, emails : emailData, feedbacks: feedbackData});
        });
    });
});

module.exports = router;
