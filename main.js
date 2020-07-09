"use strict";
exports.__esModule = true;
var Party;
(function (Party) {
    Party[Party["Dem"] = 0] = "Dem";
    Party[Party["Rep"] = 1] = "Rep";
    Party[Party["NotCalled"] = 2] = "NotCalled";
})(Party || (Party = {}));
var MAX_VOTES = 538;
var MAJORITY = 270;
var BAR_WIDTH = 800;
var BAR_HEIGHT = 100;
var DEM_COLOUR = "#244999";
var REP_COLOUR = "#e50a00";
// Class for representing each state
var State = /** @class */ (function () {
    function State(code, name, votes, last_win) {
        this.code = code;
        this.name = name;
        this.votes = votes;
        this.last_win = last_win;
        this.winner = Party.NotCalled;
    }
    return State;
}());
// Initialising all states
var al = new State("AL", "Alabama", 9, Party.Rep);
var ak = new State("AK", "Alaska", 3, Party.Rep);
var az = new State("AZ", "Arizona", 11, Party.Rep);
var ar = new State("AR", "Arkansas", 6, Party.Rep);
var ca = new State("CA", "California", 55, Party.Dem);
var co = new State("CO", "Colorado", 9, Party.Dem);
var ct = new State("CT", "Connecticut", 7, Party.Dem);
var dc = new State("DC", "Washington D.C.", 3, Party.Dem);
var de = new State("DE", "Delaware", 3, Party.Dem);
var fl = new State("FL", "Florida", 29, Party.Rep);
var ga = new State("GA", "Georgia", 16, Party.Rep);
var hi = new State("HI", "Hawaii", 4, Party.Dem);
var id = new State("ID", "Idaho", 4, Party.Rep);
var il = new State("IL", "Illinois", 20, Party.Dem);
var ind = new State("IN", "Indiana", 11, Party.Rep);
var ia = new State("IA", "Iowa", 6, Party.Rep);
var ks = new State("KS", "Kansas", 6, Party.Rep);
var ky = new State("KY", "Kentucky", 8, Party.Rep);
var la = new State("LA", "Louisiana", 8, Party.Rep);
var me = new State("ME", "Maine", 2, Party.Dem);
var me_1 = new State("ME1", "Maine District 1", 1, Party.Dem);
var me_2 = new State("ME2", "Maine District 2", 1, Party.Rep);
var md = new State("MD", "Maryland", 10, Party.Dem);
var ma = new State("MA", "Massachusetts", 11, Party.Dem);
var mi = new State("MI", "Michigan", 16, Party.Rep);
var mn = new State("MN", "Minnesota", 10, Party.Dem);
var ms = new State("MS", "Mississippi", 6, Party.Rep);
var mo = new State("MO", "Missouri", 10, Party.Rep);
var mt = new State("MT", "Montana", 3, Party.Rep);
var ne = new State("NE", "Nebraska", 2, Party.Rep);
var ne_1 = new State("NE1", "Nebraska District 1", 1, Party.Rep);
var ne_2 = new State("NE2", "Nebraska District 2", 1, Party.Rep);
var ne_3 = new State("NE3", "Nebraska District 3", 1, Party.Rep);
var nv = new State("NV", "Nevada", 6, Party.Dem);
var nh = new State("NH", "New Hampshire", 4, Party.Dem);
var nj = new State("NJ", "New Jersey", 14, Party.Dem);
var nm = new State("NM", "New Mexico", 5, Party.Dem);
var ny = new State("NY", "New York", 29, Party.Dem);
var nc = new State("NC", "North Carolina", 15, Party.Rep);
var nd = new State("ND", "North Dakota", 3, Party.Rep);
var oh = new State("OH", "Ohio", 18, Party.Rep);
var ok = new State("OK", "Oklahoma", 7, Party.Rep);
var or = new State("OR", "Oregon", 7, Party.Dem);
var pa = new State("PA", "Pennsylvania", 20, Party.Rep);
var ri = new State("RI", "Rhode Island", 4, Party.Dem);
var sc = new State("SC", "South Carolina", 9, Party.Rep);
var sd = new State("SD", "South Dakota", 3, Party.Rep);
var tn = new State("TN", "Tennessee", 11, Party.Rep);
var tx = new State("TX", "Texas", 38, Party.Rep);
var ut = new State("UT", "Utah", 6, Party.Rep);
var vt = new State("VT", "Vermont", 3, Party.Dem);
var va = new State("VA", "Virginia", 13, Party.Dem);
var wa = new State("WA", "Washington", 12, Party.Dem);
var wv = new State("WV", "West Virginia", 5, Party.Rep);
var wi = new State("WI", "Wisconsin", 10, Party.Rep);
var wy = new State("WY", "Wyoming", 3, Party.Rep);
// Add all states to a list
var states = [al, ak, az, ar, ca, co, ct, dc, de, fl, ga, hi, id, il, ind, ia, ks, ky, la, me, me_1, me_2, md, ma, mi, mn, ms, mo, mt, ne, ne_1, ne_2, ne_3,
    nv, nh, nj, nm, ny, nc, nd, oh, ok, or, pa, ri, sc, sd, tn, tx, ut, vt, va, wa, wv, wi, wy];
// Find a state object by its code and return its index
function findState(code) {
    for (var i = 0; i < states.length; i++) {
        if (states[i].code === code) {
            return i;
        }
    }
    return -1;
}
var canv = document.getElementById("canv");
var con = canv.getContext("2d");
var bidenVotes = 0;
var trumpVotes = 0;
var bidenChange = 0;
var trumpChange = 0;
// Updates the vote total and changes for each candidate
function updateVotes() {
    bidenVotes = 0;
    trumpVotes = 0;
    bidenChange = 0;
    trumpChange = 0;
    for (var _i = 0, states_2 = states; _i < states_2.length; _i++) {
        var state = states_2[_i];
        // If democrat won, add to biden's total
        if (state.winner == Party.Dem) {
            bidenVotes += state.votes;
            // If republicans won last time, add changes
            if (state.last_win == Party.Rep) {
                bidenChange += state.votes;
                trumpChange -= state.votes;
            }
        }
        // If republican won, add to trump's total
        if (state.winner == Party.Rep) {
            trumpVotes += state.votes;
            // If democrats won last time, add changes
            if (state.last_win == Party.Dem) {
                bidenChange -= state.votes;
                trumpChange += state.votes;
            }
        }
    }
}
// Updates the text showing how many votes each candidate has
function updateVoteText() {
    // Getting text elements for each candidate's number of votes
    var demVotesText = document.getElementById("dem-votes-num");
    var repVotesText = document.getElementById("rep-votes-num");
    // Getting text elements for the change in each candidate's votes
    var demVotesChangeText = document.getElementById("dem-votes-change");
    var repVotesChangeText = document.getElementById("rep-votes-change");
    // Getting text elements for how far each candidate is from 270
    var demDistanceText = document.getElementById("dem-distance");
    var repDistanceText = document.getElementById("rep-distance");
    // Set text for electoral vote count for each candidate
    demVotesText.innerHTML = bidenVotes.toString();
    repVotesText.innerHTML = trumpVotes.toString();
    // Append '+' to vote change string if vote change is positive
    var demChangeText = bidenChange.toString();
    if (bidenChange >= 0) {
        demChangeText = "+" + bidenChange.toString();
    }
    var repChangeText = trumpChange.toString();
    if (trumpChange >= 0) {
        repChangeText = "+" + trumpChange.toString();
    }
    // Setting text for change in votes
    demVotesChangeText.innerHTML = demChangeText;
    repVotesChangeText.innerHTML = repChangeText;
    // Setting colour of text for change in votes
    if (bidenChange > 0) {
        demVotesChangeText.className = "change-gain";
    }
    else if (bidenChange < 0) {
        demVotesChangeText.className = "change-loss";
    }
    else {
        demVotesChangeText.className = "change-none";
    }
    if (trumpChange > 0) {
        repVotesChangeText.className = "change-gain";
    }
    else if (trumpChange < 0) {
        repVotesChangeText.className = "change-loss";
    }
    else {
        repVotesChangeText.className = "change-none";
    }
    // Setting text for distance from 270
    if (bidenVotes < MAJORITY) {
        demDistanceText.innerHTML = MAJORITY - bidenVotes + " away from 270";
    }
    else if (bidenVotes > MAJORITY) {
        demDistanceText.innerHTML = bidenVotes - MAJORITY + " over 270";
    }
    else {
        demDistanceText.innerHTML = "Reached 270";
    }
    if (trumpVotes < MAJORITY) {
        repDistanceText.innerHTML = MAJORITY - trumpVotes + " away from 270";
    }
    else if (trumpVotes > MAJORITY) {
        repDistanceText.innerHTML = trumpVotes - MAJORITY + " over 270";
    }
    else {
        repDistanceText.innerHTML = "Reached 270";
    }
}
// Redraws the bar which shows how close each candidate is to 270 votes
function updateBar() {
    if (!con) {
        return;
    }
    con.clearRect(0, 0, canv.width, canv.height);
    con.lineWidth = 3;
    // Draw democrat bar from the left
    con.fillStyle = DEM_COLOUR;
    var demPixels = (bidenVotes / MAX_VOTES) * BAR_WIDTH;
    con.fillRect(0, 0, demPixels, BAR_HEIGHT);
    // Draw the republican bar from the right
    con.fillStyle = REP_COLOUR;
    var repPixels = (trumpVotes / MAX_VOTES) * BAR_WIDTH;
    con.fillRect(BAR_WIDTH, 0, -repPixels, 100);
    // Draw a border around the bar
    con.strokeStyle = "black";
    con.strokeRect(0, 0, BAR_WIDTH, BAR_HEIGHT);
    // Draw a line halfway through the bar
    con.lineWidth = 2;
    con.beginPath();
    con.moveTo(400, 0);
    con.lineTo(400, 100);
    con.stroke();
}
// Adds a state's information to the state table
function addToTable(state) {
    var table = document.getElementById("state-table");
    var state_html = "<tr>\n    <td>" + state.name + "</td>\n    <td>" + state.votes + "</td>\n    <td class=\"" + (state.last_win == Party.Dem ? "dem" : "rep") + "\">" + (state.last_win == Party.Dem ? "Clinton" : "Trump") + "</td>\n    <td><button class=\"rep " + state.code + "\">Trump</button</td>\n    <td><button class=\"dem " + state.code + "\">Biden</button></td>\n    <td><button class=\"ncy " + state.code + "\" disabled>Not Called Yet</button></td>\n    </tr>";
    table.innerHTML += state_html;
}
// Wrapper function for all update functions
function doUpdate() {
    updateVotes();
    updateVoteText();
    updateBar();
}
function setStateWinner(btn, win) {
    if (!btn) {
        return;
    }
    if (!btn.parentElement) {
        return;
    }
    // Get the state code and its index in the states array
    var stateCode = btn.className.split(" ")[1];
    var state_i = findState(stateCode);
    // Set state winner to win parameter
    states[state_i].winner = win;
    // enable all buttons in row, apart from one just pressed
    var other_buttons = document.getElementsByClassName(stateCode);
    for (var _i = 0, _a = Array.prototype.slice.call(other_buttons); _i < _a.length; _i++) {
        var b = _a[_i];
        if (!b) {
            return;
        }
        if (!b.parentElement) {
            return;
        }
        b.disabled = false;
        // Remove CSS styling on parent td element
        b.parentElement.className = "";
    }
    // Disable clicked button
    btn.disabled = true;
    // Set background colour of parent td element
    if (win == Party.Dem) {
        btn.parentElement.className = "dem";
    }
    else if (win == Party.Rep) {
        btn.parentElement.className = "rep";
    }
    else {
        btn.parentElement.className = "";
    }
    // Update bar and text
    doUpdate();
}
// Adds the event listeners for clicking a button in the state table
function addButtonListeners() {
    // Buttons for republican winning state
    var rep_buttons = document.getElementsByClassName("rep");
    var _loop_1 = function (button) {
        button.addEventListener("click", function () {
            return setStateWinner(button, Party.Rep);
        });
    };
    for (var _i = 0, _a = Array.prototype.slice.call(rep_buttons); _i < _a.length; _i++) {
        var button = _a[_i];
        _loop_1(button);
    }
    // Buttons for democrat winning state
    var dem_buttons = document.getElementsByClassName("dem");
    var _loop_2 = function (button) {
        button.addEventListener("click", function () {
            return setStateWinner(button, Party.Dem);
        });
    };
    for (var _b = 0, _c = Array.prototype.slice.call(dem_buttons); _b < _c.length; _b++) {
        var button = _c[_b];
        _loop_2(button);
    }
    // Buttons for states not called yet
    var ncy_buttons = document.getElementsByClassName("ncy");
    var _loop_3 = function (button) {
        button.addEventListener("click", function () {
            return setStateWinner(button, Party.NotCalled);
        });
    };
    for (var _d = 0, _e = Array.prototype.slice.call(ncy_buttons); _d < _e.length; _d++) {
        var button = _e[_d];
        _loop_3(button);
    }
}
for (var _i = 0, states_1 = states; _i < states_1.length; _i++) {
    var state = states_1[_i];
    addToTable(state);
}
doUpdate();
addButtonListeners();
// Add event listener for reset button, makes all states not called yet
var resetBtn = document.getElementById("reset-btn");
resetBtn.addEventListener('click', function () {
    // Finds all 'Not called yet' buttons and clicks them to reset all states
    var ncyBtns = document.querySelectorAll("button.ncy");
    ncyBtns.forEach(function (btn) {
        btn.click();
    });
    doUpdate();
});
// Add event listener for 2016 result button
var btn2016 = document.getElementById("btn-2016");
btn2016.addEventListener('click', function () {
    // For each state, click the button of its 2016 winner
    for (var _i = 0, states_3 = states; _i < states_3.length; _i++) {
        var state = states_3[_i];
        if (state.last_win == Party.Dem) {
            var demBtn = document.getElementsByClassName("dem " + state.code)[0];
            demBtn.click();
        }
        else {
            var repBtn = document.getElementsByClassName("rep " + state.code)[0];
            repBtn.click();
        }
    }
});
