// Fortune API found here: http://yerkee.com/api
// Uses http instead of https

const http = require("http");
const url = "http://yerkee.com/api/fortune";
let fortune = "Press the button to get your fortune!"

function getFortune(){
    http.get(url, function(response){
        if(response.statusCode !== 200)
            fortune = "Something went wrong, try again!"
        else{
            response.on("data", function(data){
                const res = JSON.parse(data);
                const message = res.fortune;
                console.log(message);

                $("p").innerText(message);
            })
        }
    });
}

$("button").on("click", function(){
    console.log("Clicked");
    getFortune();
});

