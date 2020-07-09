export {}

enum Party {Dem, Rep, NotCalled}

const MAX_VOTES: number = 538;
const MAJORITY: number = 270;

const BAR_WIDTH: number = 800;
const BAR_HEIGHT: number = 100;

const DEM_COLOUR: string = "#244999";
const REP_COLOUR: string = "#e50a00";

// Class for representing each state
class State {
    public code: string;
    public name: string;
    public votes: number;
    public last_win: Party;
    public winner: Party;

    constructor(code: string, name: string, votes: number, last_win: Party){
        this.code = code;
        this.name = name;
        this.votes = votes;
        this.last_win = last_win;
        this.winner = Party.NotCalled;
    }
}

// Initialising all states
const al: State = new State("AL", "Alabama", 9, Party.Rep);
const ak: State = new State("AK", "Alaska", 3, Party.Rep);
const az: State = new State("AZ", "Arizona", 11, Party.Rep);
const ar: State = new State("AR", "Arkansas", 6, Party.Rep);
const ca: State = new State("CA", "California", 55, Party.Dem);
const co: State = new State("CO", "Colorado", 9, Party.Dem);
const ct: State = new State("CT", "Connecticut", 7, Party.Dem);
const dc: State = new State("DC", "Washington D.C.", 3, Party.Dem);
const de: State = new State("DE", "Delaware", 3, Party.Dem);
const fl: State = new State("FL", "Florida", 29, Party.Rep);
const ga: State = new State("GA", "Georgia", 16, Party.Rep);
const hi: State = new State("HI", "Hawaii", 4, Party.Dem);
const id: State = new State("ID", "Idaho", 4, Party.Rep);
const il: State = new State("IL", "Illinois", 20, Party.Dem);
const ind: State = new State("IN", "Indiana", 11, Party.Rep);
const ia: State = new State("IA", "Iowa", 6, Party.Rep);
const ks: State = new State("KS", "Kansas", 6, Party.Rep);
const ky: State = new State("KY", "Kentucky", 8, Party.Rep);
const la: State = new State("LA", "Louisiana", 8, Party.Rep);
const me: State = new State("ME", "Maine", 2, Party.Dem);
const me_1: State = new State("ME1", "Maine District 1", 1, Party.Dem);
const me_2: State = new State("ME2", "Maine District 2", 1, Party.Rep);
const md: State = new State("MD", "Maryland", 10, Party.Dem);
const ma: State = new State("MA", "Massachusetts", 11, Party.Dem);
const mi: State = new State("MI", "Michigan", 16, Party.Rep);
const mn: State = new State("MN", "Minnesota", 10, Party.Dem);
const ms: State = new State("MS", "Mississippi", 6, Party.Rep);
const mo: State = new State("MO", "Missouri", 10, Party.Rep);
const mt: State = new State("MT", "Montana", 3, Party.Rep);
const ne: State = new State("NE", "Nebraska", 2, Party.Rep);
const ne_1: State = new State("NE1", "Nebraska District 1", 1, Party.Rep);
const ne_2: State = new State("NE2", "Nebraska District 2", 1, Party.Rep);
const ne_3: State = new State("NE3", "Nebraska District 3", 1, Party.Rep);
const nv: State = new State("NV", "Nevada", 6, Party.Dem);
const nh: State = new State("NH", "New Hampshire", 4, Party.Dem);
const nj: State = new State("NJ", "New Jersey", 14, Party.Dem);
const nm: State = new State("NM", "New Mexico", 5, Party.Dem);
const ny: State = new State("NY", "New York", 29, Party.Dem);
const nc: State = new State("NC", "North Carolina", 15, Party.Rep);
const nd: State = new State("ND", "North Dakota", 3, Party.Rep);
const oh: State = new State("OH", "Ohio", 18, Party.Rep);
const ok: State = new State("OK", "Oklahoma", 7, Party.Rep);
const or: State = new State("OR", "Oregon", 7, Party.Dem);
const pa: State = new State("PA", "Pennsylvania", 20, Party.Rep);
const ri: State = new State("RI", "Rhode Island", 4, Party.Dem);
const sc: State = new State("SC", "South Carolina", 9, Party.Rep);
const sd: State = new State("SD", "South Dakota", 3, Party.Rep);
const tn: State = new State("TN", "Tennessee", 11, Party.Rep);
const tx: State = new State("TX", "Texas", 38, Party.Rep);
const ut: State = new State("UT", "Utah", 6, Party.Rep);
const vt: State = new State("VT", "Vermont", 3, Party.Dem);
const va: State = new State("VA", "Virginia", 13, Party.Dem);
const wa: State = new State("WA", "Washington", 12, Party.Dem);
const wv: State = new State("WV", "West Virginia", 5, Party.Rep);
const wi: State = new State("WI", "Wisconsin", 10, Party.Rep);
const wy: State = new State("WY", "Wyoming", 3, Party.Rep);

// Add all states to a list
const states = [al, ak, az, ar, ca, co, ct, dc, de, fl, ga, hi, id, il, ind, ia, ks, ky, la, me, me_1, me_2, md, ma, mi, mn, ms, mo, mt, ne, ne_1, ne_2, ne_3,
    nv, nh, nj, nm, ny, nc, nd, oh, ok, or, pa, ri, sc, sd, tn, tx, ut, vt, va, wa, wv, wi, wy];

// Find a state object by its code and return its index
function findState(code: string): number{
    for(let i = 0; i < states.length; i++){
        if(states[i].code === code){
            return i;
        }
    }
    return -1;
}

const canv = <HTMLCanvasElement>document.getElementById("canv");
const con = canv.getContext("2d");

let bidenVotes: number = 0;
let trumpVotes: number = 0;

let bidenChange: number = 0;
let trumpChange: number = 0;

// Updates the vote total and changes for each candidate
function updateVotes(){
    bidenVotes = 0;
    trumpVotes = 0;

    bidenChange = 0;
    trumpChange = 0;

    for(let state of states){
        
        // If democrat won, add to biden's total
        if(state.winner == Party.Dem){
            bidenVotes += state.votes;
            // If republicans won last time, add changes
            if(state.last_win == Party.Rep){
                bidenChange += state.votes;
                trumpChange -= state.votes;
            }
        }

        // If republican won, add to trump's total
        if(state.winner == Party.Rep){
            trumpVotes += state.votes;
            // If democrats won last time, add changes
            if(state.last_win == Party.Dem){
                bidenChange -= state.votes;
                trumpChange += state.votes;
            }
        }
    }
}

// Updates the text showing how many votes each candidate has
function updateVoteText(){
    // Getting text elements for each candidate's number of votes
    const demVotesText  = document.getElementById("dem-votes-num") as HTMLHeadingElement;
    const repVotesText = document.getElementById("rep-votes-num") as HTMLHeadingElement;

    // Getting text elements for the change in each candidate's votes
    const demVotesChangeText = document.getElementById("dem-votes-change") as HTMLHeadingElement;
    const repVotesChangeText = document.getElementById("rep-votes-change") as HTMLHeadingElement;

    // Getting text elements for how far each candidate is from 270
    const demDistanceText = document.getElementById("dem-distance") as HTMLParagraphElement;
    const repDistanceText = document.getElementById("rep-distance") as HTMLParagraphElement;


    // Set text for electoral vote count for each candidate
    demVotesText.innerHTML = bidenVotes.toString();
    repVotesText.innerHTML = trumpVotes.toString();

    // Append '+' to vote change string if vote change is positive
    let demChangeText: string = bidenChange.toString();
    if(bidenChange >= 0){
        demChangeText = `+${bidenChange.toString()}`;
    }

    let repChangeText: string = trumpChange.toString();
    if(trumpChange >= 0){
        repChangeText = `+${trumpChange.toString()}`;
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

// Redraws the bar which shows how close each candidate is to 270 votes
function updateBar(){
    if(!con){
        return;
    }
    con.clearRect(0, 0, canv.width, canv.height);

    con.lineWidth = 3;

    // Draw democrat bar from the left
    con.fillStyle = DEM_COLOUR;
    const demPixels: number = (bidenVotes / MAX_VOTES) * BAR_WIDTH;
    con.fillRect(0, 0, demPixels, BAR_HEIGHT);

    // Draw the republican bar from the right
    con.fillStyle = REP_COLOUR;
    const repPixels: number = (trumpVotes / MAX_VOTES) * BAR_WIDTH;
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
function addToTable(state: State){
    const table = document.getElementById("state-table") as HTMLTableElement;

    const state_html: string = `<tr>
    <td>${state.name}</td>
    <td>${state.votes}</td>
    <td class="${state.last_win == Party.Dem ? "dem" : "rep"}">${state.last_win == Party.Dem ? "Clinton" : "Trump"}</td>
    <td><button class="rep ${state.code}">Trump</button</td>
    <td><button class="dem ${state.code}">Biden</button></td>
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

function setStateWinner(btn: HTMLButtonElement, win: Party){
    if(!btn){
        return;
    }

    if(!btn.parentElement){
        return;
    }

    // Get the state code and its index in the states array
    const stateCode: string = btn.className.split(" ")[1];
    const state_i: number = findState(stateCode);
    // Set state winner to win parameter
    states[state_i].winner = win

    // enable all buttons in row, apart from one just pressed
    const other_buttons = <HTMLCollectionOf<HTMLButtonElement>>document.getElementsByClassName(stateCode);
    for(let b of Array.prototype.slice.call(other_buttons)){
        if(!b){
            return;
        }
        if(!b.parentElement){
            return;
        }
        b.disabled = false;
        // Remove CSS styling on parent td element
        b.parentElement.className = "";
    }

    // Disable clicked button
    btn.disabled = true
    // Set background colour of parent td element
    if(win == Party.Dem){
        btn.parentElement.className = "dem";
    }else if(win == Party.Rep){
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
    const rep_buttons = document.getElementsByClassName("rep") as HTMLCollectionOf<HTMLButtonElement>;
    for (let button of Array.prototype.slice.call(rep_buttons)){
        button.addEventListener("click", () => 
            setStateWinner(button, Party.Rep));
    }

    // Buttons for democrat winning state
    const dem_buttons = document.getElementsByClassName("dem")as HTMLCollectionOf<HTMLButtonElement>;
    for (let button of Array.prototype.slice.call(dem_buttons)){
        button.addEventListener("click", () => 
            setStateWinner(button, Party.Dem));
    }

    // Buttons for states not called yet
    const ncy_buttons = document.getElementsByClassName("ncy") as HTMLCollectionOf<HTMLButtonElement>;
    for (let button of Array.prototype.slice.call(ncy_buttons)){
        button.addEventListener("click", () => 
            setStateWinner(button, Party.NotCalled));
    }

}

for(let state of states){
    addToTable(state);
}

doUpdate();
addButtonListeners();

// Add event listener for reset button, makes all states not called yet
const resetBtn = document.getElementById("reset-btn") as HTMLButtonElement;
resetBtn.addEventListener('click', () => {
    // Finds all 'Not called yet' buttons and clicks them to reset all states
    const ncyBtns = <NodeListOf<HTMLButtonElement>>document.querySelectorAll("button.ncy");
    ncyBtns.forEach((btn) => {
        btn.click();
    });

    doUpdate();
})

// Add event listener for 2016 result button
const btn2016 = document.getElementById("btn-2016") as HTMLButtonElement;
btn2016.addEventListener('click', () => {
    // For each state, click the button of its 2016 winner
    for(let state of states){
        if(state.last_win == Party.Dem){
            const demBtn = <HTMLButtonElement>document.getElementsByClassName(`dem ${state.code}`)[0];
            demBtn.click();
        }else{
            const repBtn = <HTMLButtonElement>document.getElementsByClassName(`rep ${state.code}`)[0];
            repBtn.click();
        }
    }
});
