const express=require("express");
const app=express();
const port=process.env.PORT || 3000;
const client=require("./connection.js");
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

var getResult=function(dept)
{
    return new Promise(function(resolve,reject){
        client.search({  
            index: 'diseases',
            type: 'diseaseDescription',
            body: {
              query: {
                match:{
                  description:{
                    query:dept,
                    fuzziness:4
                  }
                }
                
              }
            }
          },function (error, response,status) {
              if (error){
                reject(error);
              }
              else {
                resolve(response);
                
              }
          });
          
    })
}
app.get("/",function(req,res){
    res.send("ALL THE REQUESTS SHOULD BE MADE TO /api in the form of {query:Your query as string}")
})
app.post("/api",function(req,res){
    var query=req.body.query;
    getResult(query).then(function(arr){
        arr=arr.hits.hits;
        res.json(arr);
    }).catch(function(err){
        res.json("SORRY SOME ERROR OCCURED");
    })
})
app.listen(port,function(err){
    if(err)
    throw err;
    else
    console.log("App running on port "+port);
})