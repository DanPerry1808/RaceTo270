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

var al = new State("Alabama", 9, REP);
var ak = new State("Alaska", 3, REP);
var az = new State("Arizona", 11, REP);
var ar = new State("Arkansas", 6, REP);
var ca = new State("California", 55, DEM);
var co = new State("Colorado", 9, DEM);
var ct = new State("Connecticut", 7, DEM);
var dc = new State("Washington D.C.", 3, DEM);
var de = new State("Delaware", 3, DEM);
var fl = new State("Florida", 29, REP);
var ga = new State("Georgia", 16, REP);
var hi = new State("Hawaii", 4, DEM);
var id = new State("Idaho", 4, REP);
var il = new State("Illinois", 20, DEM);
var ind = new State("Indiana", 11, REP);
var ia = new State("Iowa", 6, REP);
var ks = new State("Kansas", 6, REP);
var ky = new State("Kentucky", 8, REP);
var la = new State("Louisiana", 8, REP);
var me = new State("Maine", 2, DEM);
var me_1 = new State("Maine District 1", 1, DEM);
var me_2 = new State("Maine District 2", 1, REP);
var md = new State("Maryland", 10, DEM);
var ma = new State("Massachusetts", 11, DEM);
var mi = new State("Michigan", 16, REP);
var mn = new State("Minnesota", 10, DEM);
var ms = new State("Mississippi", 6, REP);
var mo = new State("Missouri", 10, REP);
var mt = new State("Montana", 3, REP);
var ne = new State("Nebraska", 2, REP);
var ne_1 = new State("Nebraska District 1", 1, REP);
var ne_2 = new State("Nebraska District 2", 1, REP);
var ne_3 = new State("Nebraska District 3", 1, REP);
var nv = new State("Nevada", 6, DEM);
var nh = new State("New Hampshire", 4, DEM);
var nj = new State("New Jersey", 14, DEM);
var nm = new State("New Mexico", 5, DEM);
var ny = new State("New York", 29, DEM);
var nc = new State("North Carolina", 15, REP);
var nd = new State("North Dakota", 3, REP);
var oh = new State("Ohio", 18, REP);
var ok = new State("Oklahoma", 7, REP);
var or = new State("Oregon", 7, DEM);
var pa = new State("Pennsylvania", 20, REP);
var ri = new State("Rhode Island", 4, DEM);
var sc = new State("South Carolina", 9, REP);
var sd = new State("South Dakota", 3, REP);
var tn = new State("Tennessee", 11, REP);
var tx = new State("Texas", 38, REP);
var ut = new State("Utah", 6, REP);
var vt = new State("Vermont", 3, DEM);
var va = new State("Virginia", 13, DEM);
var wa = new State("Washington", 12, DEM);
var wv = new State("West Virginia", 5, REP);
var wi = new State("Wisconsin", 10, REP);
var wy = new State("Wyoming", 3, REP);

var states = [al, ak, az, ar, ca, co, ct, dc, de, fl, ga, hi, id, il, ind, ia, ks, ky, la, me, me_1, me_2, md, ma, mi, mn, ms, mo, mt, ne, ne_1, ne_2, ne_3,
    nv, nh, nj, nm, ny, nc, nd, oh, ok, or, pa, ri, sc, sd, tn, tx, ut, vt, va, wa, wv, wi, wy];

var canv = document.getElementById("canv");
var con = canv.getContext("2d");

var bidenVotes = 0;
var trumpVotes = 0;

function updateVotes(){
    for(state of states){
        console.log(state)
        if(state.last_win == DEM){
            bidenVotes += state.votes;
        }else{
            trumpVotes += state.votes;
        }
    }
}

function updateVoteText(){
    var demVotesText = document.getElementById("dem-votes-num");
    var repVotesText = document.getElementById("rep-votes-num");

    demVotesText.innerHTML = bidenVotes;
    repVotesText.innerHTML = trumpVotes;
}

function updateBar(){
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
}

updateVotes();
updateVoteText();
updateBar();
