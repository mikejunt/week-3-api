///
// (function () {
let teamlist: Array<object> = []
let favteam: string = localStorage.getItem("favteam")
let curteam: string = favteam
let lastteam: string = "000"
let selectteam: string = document.getElementById("teamchoice")["value"];
let selectrep: string = document.getElementById("reportchoice")["value"];
let teamchoice = document.getElementById("teamchoice");
let searchchoice = document.getElementById("reportchoice");
let searchbutton = document.getElementById("gosearch");
let results = document.getElementById("resultstarget");
let searchurl: string = ""
let rosterstring: string = ""
let searchresult: Array<object> = []
let playerdata: Array<object> = []
let playerpicked: string = ""

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

function sortplayers(a: object, b: object) {
    if (a["primary_position"] > b["primary_position"]) {
        return 1;
    }
    else if (a["primary_position"] = b["primary_position"]) {
        return 0;
    }
    else if (a["primary_position"] < b["primary_position"]) {
        return -1;
    }
}

function getteams() {
    let proceed: boolean
    fetch(`https://lookup-service-prod.mlb.com/json/named.team_all_season.bam?sport_code='mlb'&all_star_sw='N'&season='2019'&team_all_season.col_in=mlb_org_id&team_all_season.col_in=name_display_full`)
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
    document.getElementById("user-header").classList.add(`bg${favteam}`);
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

function playerdrill() {
    searchurl = `https://lookup-service-prod.mlb.com/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='R'&season='2019'&player_id='${playerpicked}'&sport_hitting_tm.col_in=avg&sport_hitting_tm.col_in=hr&sport_hitting_tm.col_in=rbi&sport_hitting_tm.col_in=avg&sport_hitting_tm.col_in=ops&sport_hitting_tm.col_in=sb`
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
            else playerdata = res["sport_hitting_tm"]["queryResults"]["row"];
            let quality: string = "";
            if (parseFloat(playerdata["ops"]) > 1.000) {
                quality = "MVP caliber"
            }
            else if (parseFloat(playerdata["ops"]) > 0.900) {
                quality = "fantastic"
            }
            else if (parseFloat(playerdata["ops"]) > 0.800) {
                quality = "quite good"
            }
            else if (parseFloat(playerdata["ops"]) > 0.700) {
                quality = "pretty average"
            }
            else if (parseFloat(playerdata["ops"]) < 0.700) {
                quality = "not good at all"
            }
            alert(`He hit ${playerdata["avg"]}, with ${playerdata["hr"]} home runs and ${playerdata["rbi"]} runs batted in.  His ${playerdata["ops"]} OPS was ${quality}.`)
        })
}

function pitcherdrill() {
    searchurl = `https://lookup-service-prod.mlb.com/json/named.sport_pitching_tm.bam?league_list_id='mlb'&game_type='R'&season='2019'&player_id='${playerpicked}'&sport_pitching_tm.col_in=era&sport_pitching_tm.col_in=ops&sport_pitching_tm.col_in=kbb&sport_pitching_tm.col_in=so&sport_pitching_tm.col_in=bb&sport_pitching_tm.col_in=hr`
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
            else playerdata = res["sport_pitching_tm"]["queryResults"]["row"];
            let quality: string = "";
            alert(`He struck out ${playerdata["so"]} hitters and walked ${playerdata["bb"]}, good for a ${playerdata["kbb"]} k/bb ratio.  His ${playerdata["ops"]} OPS allowed lead to a ${playerdata["era"]} ERA.`)
        })
}

document.getElementById("logout").addEventListener("click", function () {
    localStorage.clear();
    window.location.href = "index.html"
})

document.getElementById("gosearch").addEventListener("click", function () {
    lastteam = curteam;
    curteam = teamchoice["value"];
    if (lastteam !== curteam) {
        updateteam()
    }
    let searchpicked: string = searchchoice["value"];
    if (searchpicked === "roster") { searchurl = `https://lookup-service-prod.mlb.com/json/named.roster_40.bam?team_id='${curteam}'&roster_40.col_in=name_display_first_last&roster_40.col_in=player_id&roster_40.col_in=position_txt&roster_40.col_in=jersey_number&roster_40.col_in=primary_position` }
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
            // console.log(res)
            if (proceed = false) {
                alert("Service unavailable.");
            }
            else searchresult = res["roster_40"]["queryResults"]["row"];
            // for (let i = 0; i < searchresult.length; i++) {
            //     switch (searchresult[i]["position_txt"]) {
            //         case "P": {searchresult[i]["primary_position"] = "1"; break }
            //         case "C": {searchresult[i]["primary_position"] = "2"; break }
            //         case "1B": {searchresult[i]["primary_position"] = "3"; break }
            //         case "2B": {searchresult[i]["primary_position"] = "4"; break }
            //         case "3B": {searchresult[i]["primary_position"] = "6"; break }
            //         case "SS": {searchresult[i]["primary_position"] = "5"; break }
            //         case "LF": {searchresult[i]["primary_position"] = "7"; break }
            //         case "CF": {searchresult[i]["primary_position"] = "8"; break }
            //         case "RF": {searchresult[i]["primary_position"] = "9"; break }
            //     }
            // }
            // searchresult.sort(sortplayers);
            console.log(searchresult)
            results.innerHTML = ""
            let title = document.createElement("table");
            title.innerHTML = `<tr><th>Number</th><th>Player</th><th>Position</th></tr>`
            title.classList.add("table")
            title.classList.add("table-dark")
            title.classList.add("table-bordered")
            title.classList.add(`bg${curteam}`)
            results.append(title)
            for (let i = 0; i < searchresult.length; i++) {
                let line = document.createElement("tr");
                line.innerHTML = `<td>${searchresult[i]["jersey_number"]}</td><td id="${searchresult[i]["player_id"]}">${searchresult[i]["name_display_first_last"]}</td><td>${searchresult[i]["position_txt"]}</td>`;
                title.append(line);
                if (searchresult[i]["position_txt"] === "P") {
                    document.getElementById(`${searchresult[i]["player_id"]}`).addEventListener("click", function () {
                        playerpicked=this.id;
                        pitcherdrill();
                    })
                }
                else document.getElementById(`${searchresult[i]["player_id"]}`).addEventListener("click", function (e) {
                    playerpicked = this.id
                    playerdrill();
                })
            }
        })

})

getteams()
// })()
