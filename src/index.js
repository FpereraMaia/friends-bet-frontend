import {StandingsBrasileirao} from "./components/standings-brasileirao/standings-brasileirao";
import {Standings} from "./requests/standings";
// import {MDCDataTable} from '@material/data-table';

// register web component
if (!customElements.get('tandings-brasileirao')) {
    window.customElements.define('standings-brasileirao', StandingsBrasileirao);    
}

// fixed for now, 1 == brasileirao
const CHAMPIONSHIP_ID = 1;

var standings = new Standings();
var promiseStandings = standings.getAll(CHAMPIONSHIP_ID);
promiseStandings.then(data => document.querySelector("standings-brasileirao").setAttribute("standings", JSON.stringify(data)));
