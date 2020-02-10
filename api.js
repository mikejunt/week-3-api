///
var teamlist = [];
var favteam = localStorage.getItem("favteam");
var curteam = favteam;
var lastteam = "";
function sortfavorite(a, b) {
    if (a["mlb_org_id"] === favteam) {
        return -1;
    }
}
function getteams() {
    var proceed;
    fetch("http://lookup-service-prod.mlb.com/json/named.team_all_season.bam?sport_code='mlb'&all_star_sw='N'&season='2019'&team_all_season.col_in=mlb_org_id&team_all_season.col_in=name_display_full")
        .then(function (response) {
        if (response.status == 200) {
            proceed = true;
            return response.json();
        }
        else {
            proceed = false;
        }
    })
        .then(function (res) {
        if (proceed = false) {
            alert("Service unavailable.");
        }
        else
            teamlist = res["team_all_season"]["queryResults"]["row"];
        teamlist.sort(function (a, b) { return a["name_display_full"].localeCompare(b["name_display_full"]); });
        teamlist.sort(sortfavorite);
        for (var i = 0; i < teamlist.length; i++) {
            var entry = document.createElement("option");
            entry.value = "" + teamlist[i]["mlb_org_id"];
            entry.innerText = "" + teamlist[i]["name_display_full"];
            document.getElementById("teamchoice").append(entry);
        }
        document.getElementById("changetarget").classList.add("bg" + favteam);
    });
}
getteams();