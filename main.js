const DEM = 0;
const REP = 1;
const NOT_CALLED = 2;

const MAX_VOTES = 538;
const MAJORITY = 270;

const BAR_WIDTH = 800;
const BAR_HEIGHT = 100;

const DEM_COLOUR = "#244999";
const REP_COLOUR = "#e50a00";

// Class for representing each state
class State {
    constructor(code, name, votes, last_win){
        this.code = code;
        this.name = name;
        this.votes = votes;
        this.last_win = last_win;
        this.winner = NOT_CALLED;
    }
}

// Initialising all states
const al = new State("AL", "Alabama", 9, REP);
const ak = new State("AK", "Alaska", 3, REP);
const az = new State("AZ", "Arizona", 11, REP);
const ar = new State("AR", "Arkansas", 6, REP);
const ca = new State("CA", "California", 55, DEM);
const co = new State("CO", "Colorado", 9, DEM);
const ct = new State("CT", "Connecticut", 7, DEM);
const dc = new State("DC", "Washington D.C.", 3, DEM);
const de = new State("DE", "Delaware", 3, DEM);
const fl = new State("FL", "Florida", 29, REP);
const ga = new State("GA", "Georgia", 16, REP);
const hi = new State("HI", "Hawaii", 4, DEM);
const id = new State("ID", "Idaho", 4, REP);
const il = new State("IL", "Illinois", 20, DEM);
const ind = new State("IN", "Indiana", 11, REP);
const ia = new State("IA", "Iowa", 6, REP);
const ks = new State("KS", "Kansas", 6, REP);
const ky = new State("KY", "Kentucky", 8, REP);
const la = new State("LA", "Louisiana", 8, REP);
const me = new State("ME", "Maine", 2, DEM);
const me_1 = new State("ME1", "Maine District 1", 1, DEM);
const me_2 = new State("ME2", "Maine District 2", 1, REP);
const md = new State("MD", "Maryland", 10, DEM);
const ma = new State("MA", "Massachusetts", 11, DEM);
const mi = new State("MI", "Michigan", 16, REP);
const mn = new State("MN", "Minnesota", 10, DEM);
const ms = new State("MS", "Mississippi", 6, REP);
const mo = new State("MO", "Missouri", 10, REP);
const mt = new State("MT", "Montana", 3, REP);
const ne = new State("NE", "Nebraska", 2, REP);
const ne_1 = new State("NE1", "Nebraska District 1", 1, REP);
const ne_2 = new State("NE2", "Nebraska District 2", 1, REP);
const ne_3 = new State("NE3", "Nebraska District 3", 1, REP);
const nv = new State("NV", "Nevada", 6, DEM);
const nh = new State("NH", "New Hampshire", 4, DEM);
const nj = new State("NJ", "New Jersey", 14, DEM);
const nm = new State("NM", "New Mexico", 5, DEM);
const ny = new State("NY", "New York", 29, DEM);
const nc = new State("NC", "North Carolina", 15, REP);
const nd = new State("ND", "North Dakota", 3, REP);
const oh = new State("OH", "Ohio", 18, REP);
const ok = new State("OK", "Oklahoma", 7, REP);
const or = new State("OR", "Oregon", 7, DEM);
const pa = new State("PA", "Pennsylvania", 20, REP);
const ri = new State("RI", "Rhode Island", 4, DEM);
const sc = new State("SC", "South Carolina", 9, REP);
const sd = new State("SD", "South Dakota", 3, REP);
const tn = new State("TN", "Tennessee", 11, REP);
const tx = new State("TX", "Texas", 38, REP);
const ut = new State("UT", "Utah", 6, REP);
const vt = new State("VT", "Vermont", 3, DEM);
const va = new State("VA", "Virginia", 13, DEM);
const wa = new State("WA", "Washington", 12, DEM);
const wv = new State("WV", "West Virginia", 5, REP);
const wi = new State("WI", "Wisconsin", 10, REP);
const wy = new State("WY", "Wyoming", 3, REP);

// Add all states to a list
const states = [al, ak, az, ar, ca, co, ct, dc, de, fl, ga, hi, id, il, ind, ia, ks, ky, la, me, me_1, me_2, md, ma, mi, mn, ms, mo, mt, ne, ne_1, ne_2, ne_3,
    nv, nh, nj, nm, ny, nc, nd, oh, ok, or, pa, ri, sc, sd, tn, tx, ut, vt, va, wa, wv, wi, wy];

// Find a state object by its code and return its index
function findState(code){
    for(let i = 0; i < states.length; i++){
        if(states[i].code === code){
            return i;
        }
    }
    return "State could not be found";
}

let bidenVotes = 0;
let trumpVotes = 0;

let bidenChange = 0;
let trumpChange = 0;

// Returns the percentage of electoral votes a candidate has
// Used for calculating progress bar widths
function calcBarWidth(votes){
    return (votes * 100) / MAX_VOTES;
}

// Updates the vote total and changes for each candidate
function updateVotes(){
    bidenVotes = 0;
    trumpVotes = 0;

    bidenChange = 0;
    trumpChange = 0;

    for(let state of states){
        
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

// Updates the width and text of the progress bar
function updateProgressBar(){
    let bidenBarWidth = calcBarWidth(bidenVotes);
    let trumpBarWidth = calcBarWidth(trumpVotes);
    let middleVotes = MAX_VOTES - bidenVotes - trumpVotes;
    let middleBarWidth = calcBarWidth(middleVotes);

    let bidenBar = $('#biden-bar')[0];
    let trumpBar = $('#trump-bar')[0];
    let middleBar = $('#middle-bar')[0];

    bidenBar.style.width = `${bidenBarWidth}%`;
    bidenBar.textContent = `${bidenVotes}`;
    bidenBar.setAttribute('aria-valuenow', bidenVotes);

    trumpBar.style.width = `${trumpBarWidth}%`;
    trumpBar.textContent = `${trumpVotes}`;
    bidenBar.setAttribute('aria-valuenow', trumpVotes);

    middleBar.style.width = `${middleBarWidth}%`;
    middleBar.textContent = `${middleVotes}`;
    bidenBar.setAttribute('aria-valuenow', middleVotes);
}


// Updates the text showing how many votes each candidate has
function updateVoteText(){
    // Getting text elements for each candidate's number of votes
    const demVotesText = document.getElementById("dem-votes-num");
    const repVotesText = document.getElementById("rep-votes-num");

    // Getting text elements for the change in each candidate's votes
    const demVotesChangeText = document.getElementById("dem-votes-change");
    const repVotesChangeText = document.getElementById("rep-votes-change");

    // Getting text elements for how far each candidate is from 270
    const demDistanceText = document.getElementById("dem-distance");
    const repDistanceText = document.getElementById("rep-distance");


    // Set text for electoral vote count for each candidate
    demVotesText.innerHTML = bidenVotes;
    repVotesText.innerHTML = trumpVotes;

    // Append '+' to vote change string if vote change is positive
    let demChangeText = bidenChange;
    if(bidenChange >= 0){
        demChangeText = "+" + bidenChange;
    }

    let repChangeText = trumpChange;
    if(trumpChange >= 0){
        repChangeText = "+" + trumpChange;
    }

    // Setting text for change in votes
    demVotesChangeText.innerHTML = demChangeText;
    repVotesChangeText.innerHTML = repChangeText;

    // Setting colour of text for change in votes
    if(bidenChange > 0){
        demVotesChangeText.className = "change-gain";
    }else if(bidenChange < 0){
        demVotesChangeText.className = "change-loss";
    }else{
        demVotesChangeText.className = "change-none";
    }

    if(trumpChange > 0){
        repVotesChangeText.className = "change-gain";
    }else if(trumpChange < 0){
        repVotesChangeText.className = "change-loss";
    }else{
        repVotesChangeText.className = "change-none";
    }

    // Setting text for distance from 270
    if(bidenVotes < MAJORITY){
        demDistanceText.innerHTML = `${MAJORITY - bidenVotes} away from 270`;
    }else if(bidenVotes > MAJORITY){
        demDistanceText.innerHTML = `${bidenVotes - MAJORITY} over 270`;
    }else{
        demDistanceText.innerHTML = "Reached 270";
    }

    if(trumpVotes < MAJORITY){
        repDistanceText.innerHTML = `${MAJORITY - trumpVotes} away from 270`;
    }else if(trumpVotes > MAJORITY){
        repDistanceText.innerHTML = `${trumpVotes - MAJORITY} over 270`;
    }else{
        repDistanceText.innerHTML = "Reached 270";
    }
}

// Adds a state's information to the state table
function addToTable(state){
    const tbody = $('#state-tbody')[0];

    const state_html = `<tr>
    <td>${state.name}</td>
    <td>${state.votes}</td>
    <td class="${state.last_win == DEM ? "dem" : "rep"}">${state.last_win == DEM ? "Clinton" : "Trump"}</td>
    <td><button class="rep ${state.code} btn btn-sm btn-danger">Trump</button</td>
    <td><button class="dem ${state.code} btn btn-sm btn-primary">Biden</button></td>
    <td><button class="ncy ${state.code} btn btn-sm btn-dark" disabled>Not Called Yet</button></td>
    </tr>`;

    tbody.innerHTML += state_html;
}

// Wrapper function for all update functions
function doUpdate(){
    updateVotes()
    updateVoteText();
    updateProgressBar();
}

function setStateWinner(btn, win){
    // Get the state code and its index in the states array
    const stateCode = btn.className.split(" ")[1];
    const state_i = findState(stateCode);
    // Set state winner to win parameter
    states[state_i].winner = win

    // enable all buttons in row, apart from one just pressed
    const other_buttons = document.getElementsByClassName(stateCode);
    for(let b of other_buttons){
        b.disabled = false;
        // Remove CSS styling on parent td element
        b.parentElement.className = "";
        // Remove disabled styling on button
        b.classList.remove('btn-dark')

        // Re-adding the correct button styling
        btnText = b.textContent.trim()
        if (btnText == "Trump"){
            b.classList.add('btn-danger')
        }else if (btnText == "Biden"){
            b.classList.add('btn-primary')
        }else if (btnText == "Not Called Yet"){
            b.classList.add('btn-warning')
        }
    }

    // Disable clicked button
    btn.disabled = true
    btn.classList.remove('btn-warning', 'btn-primary', 'btn-danger')
    btn.classList.add('btn-dark')
    // Set background colour of parent td element
    if(win == DEM){
        btn.parentElement.className = "dem";
    }else if(win == REP){
        btn.parentElement.className = "rep";
    }else{
        btn.parentElement.className = "";
    }

    // Update bar and text
    doUpdate();

}

// Adds the event listeners for clicking a button in the state table
function addButtonListeners(){
    // Buttons for republican winning state
    const rep_buttons = document.getElementsByClassName("rep");
    for (let button of rep_buttons){
        button.addEventListener("click", () => 
            setStateWinner(button, REP));
    }

    // Buttons for democrat winning state
    const dem_buttons = document.getElementsByClassName("dem");
    for (let button of dem_buttons){
        button.addEventListener("click", () => 
            setStateWinner(button, DEM));
    }

    // Buttons for states not called yet
    const ncy_buttons = document.getElementsByClassName("ncy");
    for (let button of ncy_buttons){
        button.addEventListener("click", () => 
            setStateWinner(button, NOT_CALLED));
    }

}

for(state of states){
    addToTable(state);
}

doUpdate();
addButtonListeners();

// Add event listener for reset button, makes all states not called yet
document.getElementById("reset-btn").addEventListener('click', () => {
    // Finds all 'Not called yet' buttons and clicks them to reset all states
    const ncyBtns = document.querySelectorAll("button.ncy");
    for(let btn of ncyBtns){
        btn.click();
    }

    doUpdate();
})

// Add event listener for 2016 result button
document.getElementById("btn-2016").addEventListener('click', () => {
    // For each state, click the button of its 2016 winner
    for(let state of states){
        if(state.last_win == DEM){
            const demBtn = document.getElementsByClassName(`dem ${state.code}`)[0];
            demBtn.click();
        }else{
            const repBtn = document.getElementsByClassName(`rep ${state.code}`)[0];
            repBtn.click();
        }
    }
});
