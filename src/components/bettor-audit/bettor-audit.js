const templateString = `

<header>
    <h2>
        Auditoria
    </h2>
</header>
<bet-loader></bet-loader>
<div class="accordion" id="bettorsAccordion">
</div>
`;
const template = document.createElement("template");
template.innerHTML = templateString;

export class BettorAudit extends HTMLElement {
    static get observedAttributes() {
        return [ 'bettors' ];
    }

    constructor() {
        super();
    }

    connectedCallback() {
        const temp = document.importNode(template.content, true);
        this.appendChild(temp);

        this.betLoader = this.querySelector("bet-loader");
        this.bettorAccordion = this.querySelector("#bettorsAccordion");

        if(!this.bettors) {
            this.bettors = [];
        }

        this.render();
    }

    createAccordionButton(bettor) {
        let button = document.createElement("button");
        button.classList.add('accordion-button');
        button.classList.add('collapsed');
        button.setAttribute("type", "button");
        button.setAttribute("data-bs-toggle", "collapse")
        button.setAttribute("data-bs-target", `#collapse-${bettor.id}`);
        button.setAttribute("aria-expanded", "false")
        button.setAttribute("aria-controls", `collapse-${bettor.id}`);
        return button;
    }

    getBetsTable(bets) {
        let table = document.createElement("table");
        table.classList.add("table");

        let tbody = document.createElement("tbody");

        bets.forEach(bet => {
            let position = document.createTextNode(bet.position);
            let team_name = document.createTextNode(bet.team.popular_name);

            let span = document.createElement("span");
            span.classList.add("margin10");
            span.appendChild(position);

            let tr = document.createElement("tr");
            let td = document.createElement("td");
            td.appendChild(span);
            td.appendChild(team_name);

            tr.appendChild(td);
            
            tbody.appendChild(tr);
        });

        table.appendChild(tbody);

        return table;
    } 

    getAccordionBody(bettor) {
        let accordionBody = document.createElement("div");
        accordionBody.classList.add("accordion-body");

        const betsTable = this.getBetsTable(bettor.bets);
        accordionBody.appendChild(betsTable);

        return accordionBody;
    }

    createAccordionDetails(bettor) {
        let div = document.createElement("div");
        div.classList.add("accordion-collapse");
        div.classList.add("collapse");
        div.setAttribute("aria-labelledby", `heading-${bettor.id}`);
        div.setAttribute("data-bs-parent", "#bettorsAccordion");
        div.setAttribute("id", `collapse-${bettor.id}`);
        
        div.appendChild(this.getAccordionBody(bettor));
        return div;
    }

    createAccorddionItem(bettor) {
        let div = document.createElement("div");
        div.classList.add('accordion-item');
        
        const h2Accordion = document.createElement("h2");
        h2Accordion.classList.add('accordion-header');
        h2Accordion.setAttribute("id", `heading-${bettor.id}`);
        
        let button = this.createAccordionButton(bettor);
        let bettorName = document.createTextNode(bettor.name);
        button.appendChild(bettorName);

        h2Accordion.appendChild(button);
        div.appendChild(h2Accordion);

        let accordionDetails = this.createAccordionDetails(bettor);
        
        div.appendChild(accordionDetails);
        return div;
    }

    render() {
        if(this.bettors){
            this.bettors.forEach(bettor => {
                let accordionItem = this.createAccorddionItem(bettor);
                this.bettorAccordion.appendChild(accordionItem);
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

    set bettors(value) {
        this.render();
        return this.setAttribute("bettors", value);
    }

    get bettors() {
        const bettors = this.getAttribute("bettors");
        if(bettors) {
            return JSON.parse(bettors);
        }
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal !== newVal) {
          switch(name) {
              case 'bettors':
                  this.bettors = newVal;
                  break;
         }
       }
     }
}