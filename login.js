// users array
var userlist = [{ username: "Mike", password: "password", favteam: "119" }, { username: "Sarah", password: "password", favteam: "134" }, { username: "Justin", password: "password", favteam: "137" }];
var logbutton = document.getElementById("login");
var userfield = document.getElementById("user");
var passfield = document.getElementById("pass");
logbutton.addEventListener("click", function () {
    var userquery = userlist.findIndex(function (obj) { return obj["username"] === userfield["value"]; });
    console.log(userquery);
});
