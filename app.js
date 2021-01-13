const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const url = "http://yerkee.com/api/fortune";
let fortune = "Press the button to get your fortune!"

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


function getWisdom(){
    http.get(url, function(response){
        if(response.statusCode !== 200)
            fortune = "Something went wrong, try again!"
        else{
            response.on("data", function(data){
                const res = JSON.parse(data);
                const message = res.fortune;
                //console.log(message);
                fortune = message;
            })
        }
    });
}

app.get("/", function(req, res){
    getWisdom();
    res.render("wisdom", {fortune: fortune});
});

app.post("/", function(req, res){
    getWisdom();
    res.redirect("/");
});

app.listen(3000, function(){
    console.log("Server started on port 3000");
})