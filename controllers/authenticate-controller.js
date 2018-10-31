var connection = require('./../config');
var path = require('path');
/* const OAuth2Client = require('google-auth-library'); */
/* const client = new OAuth2Client(CLIENT_ID); */
var passwordHash = require('password-hash');

//var y= require("./dynamic");

module.exports.authenticate=function(req,res){
    var regno=req.body.regno;
    var password=req.body.password;    
       
            connection.query('SELECT * FROM users WHERE id = ?',[regno], function (error, results, fields) {
            
            if (error) {
                    res.json({
                        status:false,
                        message:'there are some error with query'
                    })
            }
            else{
                if(results.length >0){
                    if(passwordHash.verify(password, results[0].password)){
                        var name = results[0].first_name;
                        res.cookie('username', name ,{ maxAge: 900000 });
                        res.cookie('userreg', regno ,{ maxAge: 900000 });
                        res.cookie('authType', 0 ,{ maxAge: 900000 });        //0=local user 1=google                
                        res.redirect('./');
                        /* res.json({
                            status:true,
                            message:'successfully authenticated'
                        }) */
                    }else{
                        res.json({
                        status:false,
                        message:"Registration number and password does not match"
                        });
                    }
                
                }
                else{
                res.json({
                    status:false,    
                    message:"Registration number does not exits"
                });
                
                }
            }
            });
        
}

//session : cookies