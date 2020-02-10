// users array
var userlist = [{ username: "Mike", password: "password", favteam: "119" }, { username: "Sarah", password: "password", favteam: "134" }, { username: "Justin", password: "password", favteam: "137" }];
var logbutton = document.getElementById("login");
var userfield = document.getElementById("user");
var passfield = document.getElementById("pass");
logbutton.addEventListener("click", function () {
    if (userfield["value"].length < 3 || passfield["value"].length < 8) {
        console.log("login string verification error");
    }
    else {
        var userquery = userlist.filter(function (obj) { return obj["username"] === userfield["value"] && obj["password"] === passfield["value"]; });
        if (userquery.length === 1) {
            console.log("Login worked");
            localStorage.setItem("Username", "" + userquery[0]["username"]);
            localStorage.setItem("favteam", "" + userquery[0]["favteam"]);
            window.location.href = "api.html";
        }
        else
            console.log("Login failed");
    }
});
