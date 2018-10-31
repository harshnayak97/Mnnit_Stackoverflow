var connection = require('./../config');
var path = require('path');

module.exports.askFunction=function(req,res){
    var reg=req.cookies.userreg;
    var name=req.cookies.username;
    if(reg)
    {
        res.render('question-feed',{z:1,user_name:name, reg:reg });
    }
    else{
        res.redirect('./../login.html');
    }
}

module.exports.search=function(req,res){
    
    var tag=req.query.search;
    console.log(tag);
    var reg=req.cookies.userreg;
    var name=req.cookies.username;
    var q=[];
    var qid=[];
    var qry = 'SELECT * from questions where title="'+ tag +'";';
    console.log(qry);
    connection.query(qry, function (error, results, fields) {
            if (error ) {
                res.json({
                      status:false,
                      message:'there are some error with query'
                })
            }else if(results.length == 0){
                res.json({
                    status:false,
                    message:"tag doesn't exist"
              })
            }else{
                var len=results.length
                for(var i=0;i<len;i++)
                {
                    q.push(results[i].body);
                    qid.push(results[i].qid);
                }

                if(req.cookies.userreg)
                    res.render('tag_search',{user_name:name, z:1, q:q, qt:tag ,id:qid, reg:reg});
                else
                    res.render('tag_search',{user_name:"", z:0 ,q:q, qt:tag,id:qid, reg:reg});
            }    
    });
}

module.exports.q_enter=function(req,res){
    var reg=req.cookies.userreg;
    var name=req.cookies.username;
    var today = new Date();
    var question={
        "asked_by":reg,
        "title":req.body.q_title,
        "body":req.body.q_body
    }
    connection.query('INSERT INTO questions SET ?',question, function (error, results, fields) {
      if (error) {
        res.json({
            status:false,
            message:'there are some error with query'
        })
      }else{
        res.redirect('./');
      }
    });
}