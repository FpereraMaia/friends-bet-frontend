const templateString = `
<style>
    .margin10 {
        margin: 10px;
    }
    .LIBERTADORES {
        color: rgb(0, 0, 255);
    }
    .SULAMERICANA {
        color: rgb(0, 128, 0);
    }
    .REBAIXAMENTO {
        color: rgb(255, 0, 0);
    }
</style>
<header>
    <h2>
        Ranking da aposta
    </h2>
</header>
<bet-loader></bet-loader>
<table class="table">
    <thead class="table-head-ranking">
    </thead>
    <tbody class="table-body-ranking">
    </tbody>
</table>
`;
const template = document.createElement("template");
template.innerHTML = templateString;


export class BetRanking extends HTMLElement {
    static get observedAttributes() {
        return [ 'ranking' ];
    }

    constructor() {
        super();
    }

    connectedCallback() {
        const temp = document.importNode(template.content, true);
        this.appendChild(temp);

        this.tableElement = this.querySelector("table");
        this.tbodyElement = this.tableElement.querySelector("tbody");
        this.betLoader = this.querySelector("bet-loader");

        if(!this.ranking) {
            this.ranking = [];
        }

        this.render();
    }

    render() {
        if(this.ranking){
            this.ranking.forEach(element => {
                let tr = document.createElement("tr");
                tr.appendChild(this.getBettorNameTd(element));
                tr.appendChild(this.getTotalPoints(element));
                this.tbodyElement.appendChild(tr);
            });

            this.betLoader.setAttribute("show", false);
        }
    }

    getBettorNameTd(element) {
        let td = document.createElement("td");
        let bettorName = document.createTextNode(element.bettor_name);
        td.appendChild(bettorName);
        return td;
    }

    getTotalPoints(element) {
        let td = document.createElement("td");
        let totalPoints = document.createTextNode(element.total_points);
        td.appendChild(totalPoints);
        return td;
    }

    set ranking(value) {
        this.render();
        return this.setAttribute("ranking", value);
    }

    get ranking() {
        const ranking = this.getAttribute("ranking");
        if(ranking) {
            return JSON.parse(ranking);
        }
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal !== newVal) {
          switch(name) {
              case 'ranking':
                  this.ranking = newVal;
                  break;
         }
       }
     }
}