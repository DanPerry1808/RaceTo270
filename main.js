const DEM = 0;
const REP = 1;

const MAX_VOTES = 538;

const BAR_WIDTH = 800;
const BAR_HEIGHT = 100;

const DEM_COLOUR = "#244999";
const REP_COLOUR = "#e50a00";

function State(name, votes, last_win){
    this.name = name
    this.votes = votes
    this.last_win = last_win
}

function updateVoteText(){
    var demVotesText = document.getElementById("dem-votes-num");
    var repVotesText = document.getElementById("rep-votes-num");

    demVotesText.innerHTML = bidenVotes;
    repVotesText.innerHTML = trumpVotes;
}

var canv = document.getElementById("canv");
var con = canv.getContext("2d");

var bidenVotes = 100;
var trumpVotes = 120;

updateVoteText();

con.fillStyle = DEM_COLOUR;
var demPixels = (bidenVotes / MAX_VOTES) * BAR_WIDTH;
con.fillRect(100, 100, demPixels, BAR_HEIGHT);

con.fillStyle = REP_COLOUR;
var repPixels = (trumpVotes / MAX_VOTES) * BAR_WIDTH;
con.fillRect(100 + BAR_WIDTH, 100, -repPixels, 100);

con.strokeStyle = "black";
con.strokeRect(100, 100, BAR_WIDTH, BAR_HEIGHT);
con.beginPath();
con.moveTo(500, 100);
con.lineTo(500, 200);
con.stroke();
