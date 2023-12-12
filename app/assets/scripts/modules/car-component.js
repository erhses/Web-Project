import { fetchData } from "./fetchData.js";

const jsondata = await fetchData();
const carList = jsondata.record.carList;
class CarComponent extends HTMLElement {
    constructor() {
        super();
        this.renderCars();
    }

    renderCars() {
        const carContainer = document.querySelector('.car');
        let html = '';

        carList.forEach(car => {
            console.log(car);
            html += this.#render(car);
        });

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
        this.price.total = car.price.total;
        return `
		<div class="car__card" data-category="${this.type}">
            <h4>${this.name}</h4>
            <img src="${this.image}" width="320px" height="240px" alt="${this.name}">
            <section class="car__card__container">
                <div class="foot">
                    <div class="sda">
                        <img src="assets/images/seat.png" alt="">
                        <span>${this.seats} seat</span>
                    </div>
                    <div class="sda">
                        <img src="assets/images/miles.png" alt="">
                        <span>${this.mileage}</span>
                    </div>
                    <div class="sda">
                        <img src="assets/images/30kml.png" alt="">
                        <span>${this.fuelEfficiency}</span>
                    </div>
                    <div class="sda">
                        <img src="assets/images/gps.png" alt="">
                        <span>${this.feature}</span>
                    </div>
                </div>
                <div class="car-container">
                    <div class="price">
                        <div class="day">$${this.price.day}</div>
                        <div class="total">$${this.price.total}</div>
                    </div>
                    <car-save-button carId=${this.id} isClicked=${false} carName=${this.name}></car-save-button>
                    <car-button carId=${this.id} isClicked=${false} carName=${this.name}></car-button>
                </div>
            </section>
        </div>`;
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

window.customElements.define('car-component', CarComponent);