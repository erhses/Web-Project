import { fetchData } from "./fetchData.js";

// const template = document.createElement("template");

// template.innerHTML = `
//             <link rel="stylesheet" href="./styles/menu.css"/>
//             <a role="button" id="" class="product-item">
//                   <img class="product-image" height="200">
//                   <h2 class="product-title"></h2>
//                   <h4 class="product-calories"></h4>
//                   <p class="product-description"></p>
//             </a>
// `;

const jsondata = await fetchData();
const carList = jsondata.record.carList;
class CarComponent extends HTMLElement {
	constructor() {
		super();
		// this.attachShadow({ mode: "open" });
		// this.shadowRoot.appendChild(template.content.cloneNode(true))
	}
	/* dark mode */
	setupColor() {
		const colorScheme =
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
		this.setTheme(colorScheme);

		const handleColorChange = (e) =>
			this.setTheme(e.matches ? "dark" : "light");

		window
			.matchMedia("(prefers-color-scheme: dark)")
			.addEventListener("change", handleColorChange);
		    handleColorChange(window.matchMedia("(prefers-color-scheme: dark)"));
	}
	setTheme(colorScheme) {
		const root = document.documentElement;

		if (colorScheme === "dark") {
			root.style.setProperty("--bg-color-default", "var(--color-black-3)");
			root.style.setProperty("--text-color-default", "var(--color-white-3)");
			console.log("Color Scheme Changed to :", colorScheme);
		} else {
			root.style.setProperty("--bg-color-default", "var(--color-white-3)");
			root.style.setProperty("--text-color-default", "var(--color-black-3)");
			console.log("Color Scheme Changed to :", colorScheme);
		}
	}
	/* dark mode ends */

	renderCars() {
		const carContainer = document.querySelector(".car");
		const html = carList.map((car) => this.#render(car)).join("");
		carContainer.innerHTML = html;
	}

	#render(car) {
		this.id = car.id;
		this.name = car.name;
		this.image = car.image;
		this.type = car.type;
		this.seats = car.seats;
		this.mileage = car.mileage;
		this.fuelEfficiency = car.fuelEfficiency;
		this.feature = car.feature;
		this.price = {}; // Initialize price as an object
		this.price.day = car.price.day;
		// this.price.total = car.price.total;

		/* calculate total price */
		const dateOneInput = document.getElementById("dateOne");
		const dateTwoInput = document.getElementById("dateTwo");

		// Get the date values from the input elements
		const dateOne = new Date(dateOneInput.value);
		const dateTwo = new Date(dateTwoInput.value);

		// Calculate the date difference in days
		const timeDifference = dateTwo.getTime() - dateOne.getTime();
		const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

		// Calculate the total price for the current car
		const totalPrice = daysDifference * this.price.day;

		/* calculate total price ends*/

		return `
		<div class="car__card" data-category="${this.type}">
        <ner><h4 slot="carNamee">${this.name}</h4></ner>           
        <img src="app/${this.image}" alt="${this.name}">
            <section class="car__card__container">
                <div class="foot">
                    <div class="sda">
                        <img src="app/assets/images/seat.png" alt="">
                        <span>${this.seats} seat</span>
                    </div>
                    <div class="sda">
                        <img src="app/assets/images/miles.png" alt="">
                        <span>${this.mileage}</span>
                    </div>
                    <div class="sda">
                        <img src="app/assets/images/30kml.png" alt="">
                        <span>${this.fuelEfficiency}</span>
                    </div>
                    <div class="sda">
                        <img src="app/assets/images/gps.png" alt="">
                        <span>${this.feature}</span>
                    </div>
                </div>
                <div class="car-container">
                    <div class="price">
                        <div class="day">$${this.price.day} day</div>
                        <div class="total">$${totalPrice} total</div>
                    </div>
                    <car-save-button carId=${this.id} isClicked=${false} carName=${this.name}></car-save-button>
                    <car-button carId=${this.id} isClicked=${false} carName=${
			this.name
		}></car-button>
                    </div>
            </section>
        </div>`;
	}

	// Specify observed attributes for attributeChangedCallback
	static get observedAttributes() {
		return ["carId", "carName"];
	}

	connectedCallback() {
		console.log("Connected Callback");
		this.renderCars();
		const searchButton = document.getElementById("sda123");
		searchButton.addEventListener("click", () => {
			this.renderCars();
		});

		this.setupColor();
	}

	disconnectedCallback() {
		console.log("Disconnected Callback");
		//implementation
	}
    static get observedAttributes() {
        return ['carid']; // Specify the attributes to observe
    }
	attributeChangedCallback(name, oldVal, newVal) {
		console.log(`Attribute "${name}" changed from ${oldVal} to ${newVal}`);

        if (name === 'carid') {
            // Handle changes to the carId attribute
            this.carId = newVal;
            console.log('Updated carId property:', this.carId);
        }
	}

	adoptedCallback() {
		console.log("Adopted Callback");
		//implementation
	}
}

window.customElements.define("car-component", CarComponent);
