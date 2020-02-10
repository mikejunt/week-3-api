// users array

let userlist = [{username: "Mike", password: "password", favteam: "119"},{username: "Sarah", password: "password", favteam: "134"},{username: "Justin", password: "password", favteam: "137"}]
let logbutton = document.getElementById("login");
let userfield = document.getElementById("user");
let passfield = document.getElementById("pass");

interface User {
    username: string;
    password: string;
    favteam: string;
}


logbutton.addEventListener("click", function() {
    let userquery = userlist.findIndex(obj => obj["username"] === userfield["value"]);
    console.log(userquery)
})