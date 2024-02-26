class CarButton extends HTMLElement {
  constructor() {
    super();
    this.carId = this.getAttribute("carId");
    this.isClicked = this.getAttribute("isClicked");
    this.carName = this.getAttribute("carName");

    // Create and attach a shadow root
    this.attachShadow({ mode: "open" });

    this.#render();
    this.addEventListener("click", () => this.#addCount());
  }

  #render() {
    // Use the shadowRoot property to access the shadow DOM
    this.shadowRoot.innerHTML = `
            <style>
                .rent-now {
                    background-color: #9b8df1;
                    border: 0;
                    border-radius: 100px;
                    color: #fff;
                    font-weight: 700;
                    padding: 12.5px 30px;
                    transition: all 0.5s;
                }
                .rent-now:hover{

                }
            </style>
            <button class="rent-now">Rent now</button>
        `;
  }

  #addCount() {
    if (this.isClicked) {
        document.getElementById("save-count").textContent++;
      var newCarName = document.createElement("li");
      newCarName.textContent = this.carName;
      newCarName.id = "car-" + this.carName;
      document.getElementById("namelist").appendChild(newCarName);
    } else {
      document.getElementById("save-count").textContent--;
      var oldCarName = this.shadowRoot.getElementById("car-" + this.carName);
      if (oldCarName) {
        oldCarName.parentNode.removeChild(oldCarName);
      }
    }
    this.isClicked = !this.isClicked;
  }

  connectedCallback() {
    //implementation
  }

  disconnectedCallback() {
    //implementation
  }

  attributeChangedCallback(name, oldVal, newVal) {
    //implementation
  }

  adoptedCallback() {
    //implementation
  }
}

window.customElements.define("car-button", CarButton);
