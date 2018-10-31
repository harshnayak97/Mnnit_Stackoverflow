var connection = require('./../config');
var path = require('path');

module.exports.loadStart=function(req,res){
    var reg=req.cookies.userreg;
    var name=req.cookies.username;
    var len=0;
    var id=[];
    var ques=[];
    var quesbody=[];
    connection.query('SELECT max(qid) as res from questions',function (error, results, fields){
        if (error) {
            res.json({
                status:false,
                message:'there are some error with query'
            })
        }
        else{
            len=Math.min(results[0].res,10 );

            var qry = 'SELECT * from questions where qid between 1 and '+ len;
            connection.query(qry, function (error, results, fields) {
                if (error) {
                  res.json({
                      status:false,
                      message:'there are some error with query'
                  })
                }else{
                    len=results.length;
                    for(var i=0;i<len;i++)
                    {
                        ques.push(results[i].title);
                        quesbody.push(results[i].body); 
                        id.push(results[i].qid);
                    }

                    if(req.cookies.userreg)
                        res.render('start1',{user_name:name, z:1, q:ques, qbody:quesbody ,id:id, reg:reg});
                    else
                        res.render('start1',{user_name:"", z:0 ,q:ques, qbody:quesbody ,id:id, reg:reg});
                }
              });
            
        }
    });
    
}