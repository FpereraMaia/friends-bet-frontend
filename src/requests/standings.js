import {API_URL} from "../config";

export class Standings {

    STANDINGS_URL = "/standings";
    FULL_URL = API_URL + this.STANDINGS_URL;

    getAll(championshipId) {
        fetch(this.FULL_URL + `/${championshipId}`)
            .then(response => response.json())
            .then(data => console.log(data));
    }
}