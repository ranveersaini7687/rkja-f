//jshint esversion: 6
const express = require("express");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  const first = req.body.firstName;
  const last = req.body.lastName;
  const email = req.body.email;
  // console.log(first+" "+last+" "+email);
  // 

  const data = {
    member: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: first,
          LNAME: last
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us1.api.mailchimp.com/3.0/67d1bdbc16";

  const options = {
    method: "POST",
    auth: "ranveer: a2d23b91565ab0508870f7b5ff2913af-us1"
  };

  const request = https.request(url,options,function(response){
    response.on("data",function(data){
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();

});

app.listen(3000,function(){
  console.log("Ready To Go");
});
