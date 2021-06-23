import {configs} from "../config";

export class Standings {

    STANDINGS_URL = "/standings";
    FULL_URL = configs.API_URL + this.STANDINGS_URL;

    getAll(championshipId) {
        return fetch(this.FULL_URL + `/${championshipId}`)
            .then(response => response.json());
    }

    update(championshipId) {
        let requestOptions = {method: "POST"};
        return fetch(this.FULL_URL + `/${championshipId}`, requestOptions);
    }
}