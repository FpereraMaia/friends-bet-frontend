const templateString = `
<div class="spinner-border text-success" role="status">
  <span class="sr-only"></span>
</div>
`;
const template = document.createElement("template");
template.innerHTML = templateString;


export class Loading extends HTMLElement {
    static get observedAttributes() {
        return [ 'show' ];
    }

    constructor() {
        super();
    }

    connectedCallback() {
        const temp = document.importNode(template.content, true);
        this.appendChild(temp);

        if(!this.show) {
            this.show = true;
        }

        
    }

    render() {
        if(!this.show){
            this.style.display = "none";
        }
        else{
            this.style.display = "initial";
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

    set show(value) {
        this.render();
        // se for false, seta display none
        return this.setAttribute("show", value);
    }

    get show() {
        const show = this.getAttribute("show");
        return (show === 'true');
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal !== newVal) {
          switch(name) {
              case 'show':
                  this.show = newVal;
                  break;
         }
       }
     }
}