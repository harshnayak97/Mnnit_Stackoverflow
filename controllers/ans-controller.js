var connection = require('./../config');
var path = require('path');

module.exports.a_enter=function(req,res){
    var reg=req.cookies.userreg;
    var name=req.cookies.username;
    var id = req.query.id;
    if(reg)
    {   
        var ans={
            "qid": id,
            "body":req.body.main,
            "u_id":reg,
            "answered_by":name,
        }
        connection.query('INSERT INTO answers SET ?',ans, function (error, results, fields) {
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
    else{
        res.redirect('./../login.html');
    }
}

module.exports.ques_page=function(req,res){
    var reg=req.cookies.userreg;
    var name=req.cookies.username;
    var id = req.query.id;
    var qtitle="";
    var qbody="";
    var ans=[];
    var uid=[];
    var uName=[];
   
    var qry = 'SELECT * from questions where qid='+ id;
    connection.query(qry, function (error, results, fields) {
            if (error) {
                res.json({
                      status:false,
                      message:'there are some error with query'
                })
            }else{
                qtitle =results[0].title;
                qbody  =results[0].body;
                qry = 'SELECT * from answers where qid ='+ id;
                connection.query(qry, function (error, results, fields) {
                    if (error) {
                        res.json({
                                status:false,
                                message:'there are some error with query'
                        })
                    }else{
                        var len =results.length;
                        for(var i=0;i<len;i++)
                        {
                            ans.push(results[i].body);
                            uid.push(results[i].u_id); 
                            uName.push(results[i].answered_by);
                        }
                            
                        if(req.cookies.userreg)
                            res.render('qPage',{user_name:name,z:1,id:id ,qt:qtitle, qb:qbody ,a:ans, u_name:uName, u_id:uid, reg:reg});
                        else
                            res.render('qPage',{user_name:"", z:0 ,id:id ,qt:qtitle, qb:qbody ,a:ans, u_name:uName, u_id:uid, reg:reg});
                        }
                    });
            }
    });
}
