// users array
(function () {
let userlist: Array<User> = [{ username: "Mike", password: "password", favteam: "119" }, { username: "Sarah", password: "password", favteam: "134" }, { username: "Justin", password: "password", favteam: "137" }]
let logbutton = document.getElementById("login");
let userfield = document.getElementById("user");
let passfield = document.getElementById("pass");
let errorfield = document.getElementById("feedback")

interface User {
    username: string;
    password: string;
    favteam: string;
}


logbutton.addEventListener("click", function () {
    if (userfield["value"].length < 3 || passfield["value"].length < 8) {
        errorfield.innerText = "Invalid username or password entry."
    }
    else {
        let userquery = userlist.filter(obj => obj["username"] === userfield["value"] && obj["password"] === passfield["value"]);
        if (userquery.length === 1) {
            localStorage.setItem("username", `${userquery[0]["username"]}`);
            localStorage.setItem("favteam", `${userquery[0]["favteam"]}`);
            window.location.href = "api.html"
        }
        errorfield.innerText = "Username or password incorrect."
    }
})
})()