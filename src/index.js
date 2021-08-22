import {RegisterComponent} from "./components/register-components";
import { Bettor } from "./requests/bettor";
import { Ranking } from "./requests/ranking";
import { Standings } from "./requests/standings";

// register web component
const registerComponent = new RegisterComponent();
registerComponent.run();

// fixed for now, 1 == brasileirao
const CHAMPIONSHIP_ID = 1;

var standings = new Standings();
var promiseStandings = standings.getAll(CHAMPIONSHIP_ID);
promiseStandings.then(data => document.querySelector("standings-brasileirao").setAttribute("standings", JSON.stringify(data)));

var ranking = new Ranking(standings);
var promiseRanking = ranking.getAll(CHAMPIONSHIP_ID);
promiseRanking.then(data => document.querySelector("bet-ranking").setAttribute("ranking", JSON.stringify(data)));


var bettor = new Bettor();
var promiseBettor = bettor.getAll(CHAMPIONSHIP_ID);
promiseBettor.then(data => document.querySelector("bettor-audit").setAttribute("bettors", JSON.stringify(data)));
