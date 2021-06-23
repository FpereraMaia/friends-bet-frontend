import {configs} from "../config";

export class Ranking {
    constructor(standingRequest = null) {
        this.standingRequest = standingRequest;
    }

    RANKING_URL = "/bet-ranking";
    FULL_URL = configs.API_URL + this.RANKING_URL;

    getAll(championshipId) {
        return this.standingRequest.update(championshipId).then(response => {
            return fetch(this.FULL_URL + `/${championshipId}`).then(response => response.json());
        })
    }
}