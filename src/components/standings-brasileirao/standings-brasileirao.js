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
        Classificação
    </h2>
</header>
<bet-loader></bet-loader>
<table class="table">
    <thead class="table-head-brasileirao">
    </thead>
    <tbody class="table-body-brasileirao">
    </tbody>
</table>

`;
const template = document.createElement("template");
template.innerHTML = templateString;


export class StandingsBrasileirao extends HTMLElement {
    static get observedAttributes() {
        return [ 'standings' ];
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

        if(!this.standings) {
            this.standings = [];
        }

        this.render();
    }

    render() {
        if(this.standings){
            this.standings.forEach(element => {
                let tr = document.createElement("tr");
                tr.appendChild(this.getPositionTd(element));
                this.tbodyElement.appendChild(tr);
            });

            this.betLoader.setAttribute("show", false);
        }
    }

    getPositionTd(element) {
        let td = document.createElement("td");
        let span = document.createElement("span");
        span.classList.add("margin10");

        if(element.position_rule) {
            span.classList.add(element.position_rule);
        }
        let textPosition = document.createTextNode(element.position);
        span.appendChild(textPosition);
        td.appendChild(span);
        let team = document.createTextNode(element.team.popular_name);
        td.appendChild(team);
        return td;
    }

    set standings(value) {
        this.render();
        return this.setAttribute("standings", value);
    }

    get standings() {
        const standings = this.getAttribute("standings");
        if(standings) {
            return JSON.parse(standings);
        }
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal !== newVal) {
          switch(name) {
              case 'standings':
                  this.standings = newVal;
                  break;
         }
       }
     }
}