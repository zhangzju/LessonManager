var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host            : 'localhost',
  user            : 'root',
  password        : '!19921221Zz',
  database        : 'info'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.mySession.login){
    res.redirect('/register')
  }else{
    res.render('index', { title: 'Express' });
  }

});

router.get('/register', function(req, res, next) {
  res.render('register',{title:"register"})
})

router.get('/test', function(req, res, next) {
  connection.query('SELECT * from teacher_info', function (error, results, fields) {
    if (error) throw error;
    console.log(results);
  });
})

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login'})
})

router.post('/login', function(req, res, next) {
  console.log(req.body)
  if(req.body.username.length <= 5 || req.body.password.length <= 3){
    res.render('error',{ message: "Wrong format!"})
  }else{
    let sql = 'SELECT * from teacher_info where name = "'+ req.body.username + '"';
    console.log(sql)
    connection.query(sql, function (error, results, fields) {
      if (error) throw error;
      if(results.length == 0){
        res.render('error',{message:"You are not registerred now!"})
      }else{
        res.body.mySession = results[0].name;
        res.render('index',{title:req.body.username})
      }
    });
  }
})

module.exports = router;
