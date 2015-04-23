var express = require('express');
var sqlite = require('sqlite3');
var router = express.Router();
var passport = require('passport');
var google_auth = require('passport-google').Strategy;

var app = express();

var emails = new sqlite.Database('../emails.db');
var feedbacks = new sqlite.Database('../feedback.db');

var date = new Date();
var EMAILS_TABLE = "emails_" + (date.getYear() + 1900) + "_" + ((date.getMonth() + 1) < 7 ? "1" : "2");
var FEEDBACK_TABLE = "feedback12";

passport.use(new google_auth({
        returnURL: 'http://localhost:3004/admin',
        realm: 'http://localhost:3004'
    },
    function(identifier, profile, done) {
        //User.findOrCreate({ openId: identifier }, function(err, user) {
        //    done(err, user);
        //});
    }
));

router.get('/auth/google', passport.authenticate('google'));
router.post('/auth/google/return', passport.authenticate('google', { successRedirect: 'localhost:3004/admin',
    failureRedirect: 'admin/auth/google' }));

router.get('/', function(req, res) {
    if (req.query['openid.ext1.value.email'] == null) {
        res.redirect('admin/auth/google');
    }
    else {
        var username = req.query['openid.ext1.value.lastname'] + " " + req.query['openid.ext1.value.firstname']
        var count = 0;
        var emailData = [];
        var feedbackData = [];

        emails.each('SELECT DISTINCT * FROM ' + EMAILS_TABLE + " GROUP BY EMAIL ORDER BY ID ASC", function (err, row) {
            emailData.push({id: row.id, name: row.name, email: row.email, comesfrom: row.comesfrom, info: row.info});
            count++;
        }, function (err, rows) {
            feedbacks.each('SELECT * FROM ' + FEEDBACK_TABLE, function (err, row) {
                feedbackData.push({name: row.name, email: row.email, text: row.feedback});
            }, function (err, rows) {
                res.render("admin", {titleCount: count, emails: emailData, feedbacks: feedbackData, name: username});
            });
        });
    }
});

router.get('/logout', function(req, res){
    res.redirect('/admin');
});

module.exports = router;
