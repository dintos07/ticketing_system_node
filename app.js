const express = require('express');
const Promise = require('bluebird');
const app = express();
var router = express.Router();
const database_object=require("./source/databasemodel.js");
 
app.use(express.json());
app.use("/auth",function(req, res, next){
	var response={};
	res.header("Access-Control-Allow-Origin", "*");
    res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
   );

    if(req.body.username ===undefined || req.body.password ===undefined){
    	response['error_flag']="1";
		response['message']="Something went wrong .Please contact admin";
    }else if(req.body.username=="" && req.body.password==""){
		response['error_flag']="1";
		response['message']="Please fille the required fields";
	}else if(req.body.username==""){
		response['error_flag']="1";
		response['message']="User Name is Required";
	}else if(req.body.password==""){
		response['error_flag']="1";
		response['message']="password is Required";
	}else{
		response['error_flag']="0";
	}
    if (response.error_flag != '1') {
          next();
    }else{
    	  res.send(response);
    	  res.end();
    }
    
})

router.post("/",async function(req,res){

	response={};
	try{
		var where =Array();
		where.push(req.body.username);
		where.push(req.body.password);
		var current_sql="select id,name,status from user_credentials where user_name=? and password=?";
	    var user_details=await database_object.db_datacheck(current_sql,where).then(resuldata =>{
	    	 return resuldata;
	    });

        if(user_details!==undefined){
		     	if(user_details.status=="1"){
		     		response['error_flag']="0";

		     	}else{
		     		response['error_flag']="1";
				    response['message']="Sorry!. Your login is deactivated .Please contact admin";
		     	}

	     }else{
	     	response['error_flag']="1";
			response['message']="User name or password is wrong";

	     }
     
      }catch(error){
        response['error_flag']="1";
		response['message']="Something went wrong.Please contact admin";
      	 
      }
    
    res.json(response);
});

 app.use("/auth",router);

app.listen(4041, () => {
  console.log("Server running on port 4041");
});


