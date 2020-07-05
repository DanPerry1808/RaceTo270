const DEM = 0;
const REP = 1;
const NOT_CALLED = 2;

const MAX_VOTES = 538;

const BAR_WIDTH = 800;
const BAR_HEIGHT = 100;

const DEM_COLOUR = "#244999";
const REP_COLOUR = "#e50a00";

const DEM_2016 = 232;
const REP_2016 = 306;

function State(code, name, votes, last_win, winner = NOT_CALLED){
    this.code = code;
    this.name = name;
    this.votes = votes;
    this.last_win = last_win;
    this.winner = winner;
}

var al = new State("AL", "Alabama", 9, REP);
var ak = new State("AK", "Alaska", 3, REP);
var az = new State("AZ", "Arizona", 11, REP);
var ar = new State("AR", "Arkansas", 6, REP);
var ca = new State("CA", "California", 55, DEM);
var co = new State("CO", "Colorado", 9, DEM);
var ct = new State("CT", "Connecticut", 7, DEM);
var dc = new State("DC", "Washington D.C.", 3, DEM);
var de = new State("DE", "Delaware", 3, DEM);
var fl = new State("FL", "Florida", 29, REP);
var ga = new State("GA", "Georgia", 16, REP);
var hi = new State("HI", "Hawaii", 4, DEM);
var id = new State("ID", "Idaho", 4, REP);
var il = new State("IL", "Illinois", 20, DEM);
var ind = new State("IN", "Indiana", 11, REP);
var ia = new State("IA", "Iowa", 6, REP);
var ks = new State("KS", "Kansas", 6, REP);
var ky = new State("KY", "Kentucky", 8, REP);
var la = new State("LA", "Louisiana", 8, REP);
var me = new State("ME", "Maine", 2, DEM);
var me_1 = new State("ME1", "Maine District 1", 1, DEM);
var me_2 = new State("ME2", "Maine District 2", 1, REP);
var md = new State("MD", "Maryland", 10, DEM);
var ma = new State("MA", "Massachusetts", 11, DEM);
var mi = new State("MI", "Michigan", 16, REP);
var mn = new State("MN", "Minnesota", 10, DEM);
var ms = new State("MS", "Mississippi", 6, REP);
var mo = new State("MO", "Missouri", 10, REP);
var mt = new State("MT", "Montana", 3, REP);
var ne = new State("NE", "Nebraska", 2, REP);
var ne_1 = new State("NE1", "Nebraska District 1", 1, REP);
var ne_2 = new State("NE2", "Nebraska District 2", 1, REP);
var ne_3 = new State("NE3", "Nebraska District 3", 1, REP);
var nv = new State("NV", "Nevada", 6, DEM);
var nh = new State("NH", "New Hampshire", 4, DEM);
var nj = new State("NJ", "New Jersey", 14, DEM);
var nm = new State("NM", "New Mexico", 5, DEM);
var ny = new State("NY", "New York", 29, DEM);
var nc = new State("NC", "North Carolina", 15, REP);
var nd = new State("ND", "North Dakota", 3, REP);
var oh = new State("OH", "Ohio", 18, REP);
var ok = new State("OK", "Oklahoma", 7, REP);
var or = new State("OR", "Oregon", 7, DEM);
var pa = new State("PA", "Pennsylvania", 20, REP);
var ri = new State("RI", "Rhode Island", 4, DEM);
var sc = new State("SC", "South Carolina", 9, REP);
var sd = new State("SD", "South Dakota", 3, REP);
var tn = new State("TN", "Tennessee", 11, REP);
var tx = new State("TX", "Texas", 38, REP);
var ut = new State("UT", "Utah", 6, REP);
var vt = new State("VT", "Vermont", 3, DEM);
var va = new State("VA", "Virginia", 13, DEM);
var wa = new State("WA", "Washington", 12, DEM);
var wv = new State("WV", "West Virginia", 5, REP);
var wi = new State("WI", "Wisconsin", 10, REP);
var wy = new State("WY", "Wyoming", 3, REP);

var states = [al, ak, az, ar, ca, co, ct, dc, de, fl, ga, hi, id, il, ind, ia, ks, ky, la, me, me_1, me_2, md, ma, mi, mn, ms, mo, mt, ne, ne_1, ne_2, ne_3,
    nv, nh, nj, nm, ny, nc, nd, oh, ok, or, pa, ri, sc, sd, tn, tx, ut, vt, va, wa, wv, wi, wy];

// Find a state object by its code and return its index
function findState(code){
    for(i = 0; i < states.length; i++){
        if(states[i].code === code){
            return i;
        }
    }
    return "State could not be found";
}

var canv = document.getElementById("canv");
var con = canv.getContext("2d");

var bidenVotes = 0;
var trumpVotes = 0;

var bidenChange = 0;
var trumpChange = 0;

// Updates the vote total and changes for each candidate
function updateVotes(){
    bidenVotes = 0;
    trumpVotes = 0;

    bidenChange = 0;
    trumpChange = 0;

    for(state of states){
        
        // If democrat won, add to biden's total
        if(state.winner == DEM){
            bidenVotes += state.votes;
            // If republicans won last time, add changes
            if(state.last_win == REP){
                bidenChange += state.votes;
                trumpChange -= state.votes;
            }
        }

        // If republican won, add to trump's total
        if(state.winner == REP){
            trumpVotes += state.votes;
            // If democrats won last time, add changes
            if(state.last_win == DEM){
                bidenChange -= state.votes;
                trumpChange += state.votes;
            }
        }
    }
}

// Updates the text showing how many votes each candidate has
function updateVoteText(){
    // Getting text elements for each candidate's number of votes
    var demVotesText = document.getElementById("dem-votes-num");
    var repVotesText = document.getElementById("rep-votes-num");

    // Getting text elements for the change in each candidate's votes
    var demVotesChangeText = document.getElementById("dem-votes-change");
    var repVotesChangeText = document.getElementById("rep-votes-change");

    demVotesText.innerHTML = bidenVotes;
    repVotesText.innerHTML = trumpVotes;

    // Append '+' to change if vote change is positive
    var demChangeText = bidenChange;
    if(bidenChange >= 0){
        demChangeText = "+" + bidenChange;
    }
    var repChangeText = trumpChange;
    if(trumpChange >= 0){
        repChangeText = "+" + trumpChange;
    }

    demVotesChangeText.innerHTML = demChangeText;
    repVotesChangeText.innerHTML = repChangeText;
}

// Redraws the bar which shows how close each candidate is to 270 votes
function updateBar(){
    con.clearRect(0, 0, canv.width, canv.height);
    // Draw democrat bar from the left
    con.fillStyle = DEM_COLOUR;
    var demPixels = (bidenVotes / MAX_VOTES) * BAR_WIDTH;
    con.fillRect(100, 100, demPixels, BAR_HEIGHT);

    // Draw the republican bar from the right
    con.fillStyle = REP_COLOUR;
    var repPixels = (trumpVotes / MAX_VOTES) * BAR_WIDTH;
    con.fillRect(100 + BAR_WIDTH, 100, -repPixels, 100);

    // Draw a border around the bar
    con.strokeStyle = "black";
    con.strokeRect(100, 100, BAR_WIDTH, BAR_HEIGHT);
    // Draw a line halfway through the bar
    con.beginPath();
    con.moveTo(500, 100);
    con.lineTo(500, 200);
    con.stroke();
}

// Adds a state's information to the state table
function addToTable(state){
    var table = document.getElementById("state-table");

    state_html = `<tr>
    <td>${state.name}</td>
    <td>${state.votes}</td>
    <td>${state.last_win == DEM ? "Democrat" : "Republican"}</td>
    <td><button class="rep ${state.code}">Republican</button</td>
    <td><button class="dem ${state.code}">Democrat</button></td>
    <td><button class="ncy ${state.code}" disabled>Not Called Yet</button></td>
    </tr>`;

    table.innerHTML += state_html;
}

// Wrapper function for all update functions
function doUpdate(){
    updateVotes()
    updateVoteText();
    updateBar();
}

function addButtonListeners(){
    // Buttons for republican winning state
    var rep_buttons = document.getElementsByClassName("rep");
    for (button of rep_buttons){
        button.addEventListener("click", function(){
            var state_code = this.className.split(" ")[1];
            var state_i = findState(state_code);
            states[state_i].winner = REP;

            // Re-enables the other buttons
            var other_buttons = document.getElementsByClassName(state_code);
            for(b of other_buttons){
                b.disabled = false;
            }

            //Re-disable the button just clicked
            this.disabled = true;

            doUpdate();
        });
    }

    // Buttons for democrat winning state
    var dem_buttons = document.getElementsByClassName("dem");
    for (button of dem_buttons){
        button.addEventListener("click", function(){
            var state_code = this.className.split(" ")[1];
            var state_i = findState(state_code);
            states[state_i].winner = DEM;

            // Re-enables the other buttons
            var other_buttons = document.getElementsByClassName(state_code);
            for(b of other_buttons){
                b.disabled = false;
            }

            //Re-disable the button just clicked
            this.disabled = true;

            doUpdate();
        });
    }

    // Buttons for states not called yet
    var ncy_buttons = document.getElementsByClassName("ncy");
    for (button of ncy_buttons){
        button.addEventListener("click", function(){
            var state_code = this.className.split(" ")[1];
            var state_i = findState(state_code);
            states[state_i].winner = NOT_CALLED;

            // Re-enables the other buttons
            var other_buttons = document.getElementsByClassName(state_code);
            for(b of other_buttons){
                b.disabled = false;
            }

            //Re-disable the button just clicked
            this.disabled = true;

            doUpdate();
        });
    }

}

for(state of states){
    addToTable(state);
}

doUpdate();
addButtonListeners();
