var connection = require('./../config');
var path = require('path');
var temp1="";
var temp2="";
var temp3="";
function retrieve(qry){    
    connection.query(qry, function (error, _results, fields) {
        if (error) {
            res.json({
                status:false,
                message:'there are some error with query'
            })
        }else{
             temp1=_results[0].title;
             temp2=_results[0].body;
             temp3=_results[0].qid;
             console.log(temp3)
        }
    });
}

module.exports.search=function(req,res){
    
    var user=req.query.search;
    var link="/user?id="+user;
    res.redirect(link);
}

module.exports.detail=function(req,res){
    var reg=req.cookies.userreg;
    var name=req.cookies.username;
    var id=req.query.id;
    var uname="";
    var qAskedTitle=[];
    var qAskedBody=[];
    var qAskedId=[];
    var email="";

    var _qry = 'SELECT * from users where id='+ id;
    connection.query(_qry, function (error, result, fields) {
         if(result.length == 0){
            res.json({
                status:false,
                message:"user doesn't exist"
          })
        }
    var qry = 'SELECT * from questions where asked_by='+ id;
    connection.query(qry, function (error, results, fields) {
            if (error ) {
                res.json({
                      status:false,
                      message:'there are some error with query'
                })
            }else{
                var len=results.length;
                for(var i=0;i<len;i++)
                {
                    qAskedTitle.push(results[i].title);
                    qAskedBody.push(results[i].body);
                    qAskedId.push(results[i].qid);
                }
                
                
                var qry = 'SELECT * from answers where  u_id='+ id;
                connection.query(qry, function (error, results, fields) {
                    if (error) {
                        res.json({
                                status:false,
                                message:'there are some error with query'
                        })
                    }else{
                        var qAnsweredTitle=[];
                        var qAnsweredBody=[];
                        var qAnsweredId=[];
                        var _len =results.length;
                        
                        for(var i=0;i<_len;i++)
                        {   
                            var _qry = 'SELECT * from questions where qid='+ results[i].qid;
                            console.log(_qry)
                            retrieve(_qry);
                            qAnsweredTitle.push(temp1);
                            qAnsweredBody.push(temp2);
                            qAnsweredId.push(temp3);
                            console.log(temp3);
                            console.log("lol")
                        }
                        qry = 'SELECT * from users where id='+ id;
                        connection.query(qry, function (error, results, fields) {
                            if (error) {
                                res.json({
                                        status:false,
                                        message:'there are some error with query'
                                })  
                            }else{
                                uname=results[0].first_name;
                                email=results[0].email;
                                if(req.cookies.userreg)
                                    res.render('user',{reg:reg, user_name:name,z:1,id:id ,qAskT:qAskedTitle, qAskB:qAskedBody,qAnsT:qAnsweredTitle, qAnsB:qAnsweredBody , u_name:uname, email:email, qAskId:qAskedId, qAnsId:qAnsweredId});
                                else
                                    res.render('user',{reg:reg, user_name:"",z:0,id:id ,qAskT:qAskedTitle, qAskB:qAskedBody,qAnsT:qAnsweredTitle, qAnsB:qAnsweredBody , u_name:uname, email:email, qAskId:qAskedId, qAnsId:qAnsweredId});
                                
                            }
                        });
                    }
                });
            }
    });
});
}
