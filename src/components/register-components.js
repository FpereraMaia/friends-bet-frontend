import { StandingsBrasileirao } from "./standings-brasileirao/standings-brasileirao";
import { BetRanking } from "./bet-ranking/bet-ranking";
import { Loading } from "./loading/loading";
import { BettorAudit } from "./bettor-audit/bettor-audit";

export class RegisterComponent {
    COMPONENTS = {
        'standings-brasileirao': StandingsBrasileirao,
        'bet-ranking': BetRanking,
        'bet-loader': Loading,
        'bettor-audit': BettorAudit
    }

    run() {
        for (var key in this.COMPONENTS) {
            if (this.COMPONENTS.hasOwnProperty(key) && !customElements.get(key)) {
                window.customElements.define(key, this.COMPONENTS[key]);
            }
        }
    }
}
