///
let teamlist: Array<object> = []
let favteam: string = localStorage.getItem("favteam")
let curteam: string = favteam
let lastteam: string = "000"
let selectteam: string = document.getElementById("teamchoice")["value"];
let selectrep: string = document.getElementById("reportchoice")["value"];
let teamchoice = document.getElementById("teamchoice");
let searchchoice = document.getElementById("reportchoice");
let searchbutton = document.getElementById("gosearch");
let searchurl: string = ""
let rosterstring: string = `http://lookup-service-prod.mlb.com/json/named.roster_40.bam?team_id='${curteam}'&roster_40.col_in=name_display_first_last&roster_40.col_in=position_txt&roster_40.col_in=player_id&roster_40.col_in=position_txt&roster_40.col_in=jersey_number`
let searchresult: Array<object> = []


interface User {
    username: string;
    password: string;
    favteam: string;
}

function sortcurrent(a: object, b) {
    if (a["mlb_org_id"] === curteam) {
        return -1;
    }
}


function getteams() {
    let proceed: boolean
    fetch(`http://lookup-service-prod.mlb.com/json/named.team_all_season.bam?sport_code='mlb'&all_star_sw='N'&season='2019'&team_all_season.col_in=mlb_org_id&team_all_season.col_in=name_display_full`)
        .then(function (response) {
            if (response.status == 200) {
                proceed = true;
                return response.json()
            }
            else {
                proceed = false;
            }
        })
        .then(function (res) {
            if (proceed = false) {
                alert("Service unavailable.");
            }
            else teamlist = res["team_all_season"]["queryResults"]["row"]
            document.getElementById("usernamedisplay").innerText = ` ${localStorage.getItem("username")}`;
            updateteam();
        })

}

function updateteam() {
    teamlist.sort((a, b) => a["name_display_full"].localeCompare(b["name_display_full"]))
    teamlist.sort(sortcurrent)
    teamchoice.innerHTML = ""
    for (let i = 0; i < teamlist.length; i++) {
        let entry = document.createElement("option");
        entry.value = `${teamlist[i]["mlb_org_id"]}`
        entry.innerText = `${teamlist[i]["name_display_full"]}`
        teamchoice.append(entry)
        document.querySelectorAll(".change-target").forEach(object => { object.classList.remove(`bg${lastteam}`) });
        document.querySelectorAll(".change-target").forEach(object => { object.classList.add(`bg${curteam}`) });
    }
}



document.getElementById("logout").addEventListener("click", function () {
    localStorage.clear();
    window.location.href = "index.html"
})

document.getElementById("gosearch").addEventListener("click", function () {
    if (lastteam !== curteam) {
        lastteam = curteam;
        curteam = teamchoice["value"];
        updateteam()
    }
    let searchpicked: string = searchchoice["value"];
    if (searchpicked === "roster") { searchurl = rosterstring }
    let proceed: boolean
    fetch(`${searchurl}`)
        .then(function (response) {
            if (response.status == 200) {
                proceed = true;
                return response.json()
            }
            else {
                proceed = false;
            }
        })
        .then(function (res) {
            if (proceed = false) {
                alert("Service unavailable.");
            }
            else searchresult = res["roster_40"]["queryResults"]["row"];
            console.log(searchresult)
        })

})




getteams()
