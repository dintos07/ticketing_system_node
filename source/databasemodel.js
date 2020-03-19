const pool_mysql=require("./mysqlconnection.js");

class databasemodel{
  
  db_datacheck(sql,where){
    return new Promise((resolve, reject) => {
      var query =pool_mysql.query(sql,where,(err,rows,fields)=>{ 
      	if(err)
      		return reject(err);
      	else{
      		return resolve(rows[0]);
      	}
      });      
    });
  }
	
}

const database_object=new databasemodel();
module.exports=database_object;