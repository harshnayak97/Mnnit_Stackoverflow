var express=require("express");
var bodyParser=require('body-parser');
var router = express.Router();
var cookieParser = require('cookie-parser')
var path = require('path')
var connection = require('./config');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var app = express();


app.set('view engine', 'ejs');
app.set('views','./');
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static("./"));
app.use(cookieParser());

app.get('/logout.html',function(req,res){
    res.clearCookie('username', { path: '/' });
    res.clearCookie('userreg', { path: '/' });
    res.redirect('./');
});

var authenticateController=require('./controllers/authenticate-controller');
var registerController=require('./controllers/register-controller');
var userdetail=require('./controllers/user-detail');
var ask = require('./controllers/ask-controller');
var ans = require('./controllers/ans-controller');
var start = require('./controllers/start-controller');
app.use(bodyParser.json());

//route to handle controls
app.get('/searchUser',userdetail.search);
app.get('/searchTag',ask.search);
app.get('/',start.loadStart);
app.post('/register',registerController.register);
app.post('/authenticate',authenticateController.authenticate);
app.get('/user',userdetail.detail);
app.get('/ask_q',ask.askFunction);
app.post('/enter_q',ask.q_enter);
app.get('/ques',ans.ques_page);
app.post('/enter_a',ans.a_enter);

app.listen(3009,()=>{
    console.log("server up and running on 3009...")
});

