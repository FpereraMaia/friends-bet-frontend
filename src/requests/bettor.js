import {configs} from "../config";

export class Bettor {

    BETTOR_URL = "/bettors";
    FULL_URL = configs.API_URL + this.BETTOR_URL;

    getAll(championshipId) {
        return fetch(this.FULL_URL + `/${championshipId}`)
            .then(response => response.json());
    }
}