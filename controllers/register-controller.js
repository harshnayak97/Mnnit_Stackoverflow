var connection = require('./../config');
var passwordHash = require('password-hash');
module.exports.register=function(req,res){
    var today = new Date();
    var hashedPassword = passwordHash.generate(req.body.password);
    console.log(hashedPassword);
    var users={
        "id": req.body.regno,
        "first_name":req.body.first_name,"last_name":req.body.last_name,
        "email":req.body.email,
        "password":hashedPassword,
        "created":today,
        "modified":today 
    }
    connection.query('SELECT * FROM users WHERE id = ?',[users.id], function (error, results, fields) {
            
        if (error) {
            res.json({
                status:false,
                message:'there are some error with query1'
            })     
        }
        else{
            if(results.length == 1){
                res.json({
                    status:false,
                    message:'User Already exists'
                })     
            }
            else{
                connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
                if (error) {
                    res.json({
                        status:false,
                        message:'there are some error with query2'
                    })
                }else{
                    res.cookie('username', users.first_name ,{ maxAge: 900000 });
                    res.cookie('userreg', users.id ,{ maxAge: 900000 });
                    res.cookie('authType', 0 ,{ maxAge: 900000 });        //0=local user 1=google                
                    res.redirect('./');
                }
                });
            }
        } 
    });   
}