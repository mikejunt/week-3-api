// users array
var userlist = [{ username: "Mike", password: "password", favteam: "119" }, { username: "Sarah", password: "password", favteam: "134" }, { username: "Justin", password: "password", favteam: "137" }];
var logbutton = document.getElementById("login");
var userfield = document.getElementById("user");
var passfield = document.getElementById("pass");
var errorfield = document.getElementById("feedback");
logbutton.addEventListener("click", function () {
    if (userfield["value"].length < 3 || passfield["value"].length < 8) {
        errorfield.innerText = "Invalid username or password entry.";
    }
    else {
        var userquery = userlist.filter(function (obj) { return obj["username"] === userfield["value"] && obj["password"] === passfield["value"]; });
        if (userquery.length === 1) {
            localStorage.setItem("Username", "" + userquery[0]["username"]);
            localStorage.setItem("favteam", "" + userquery[0]["favteam"]);
            window.location.href = "api.html";
        }
        errorfield.innerText = "Username or password incorrect.";
    }
});
