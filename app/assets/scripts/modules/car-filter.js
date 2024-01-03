	class Car {
		constructor(car) {
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
		}

		Render() {
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
			</div>
			<button class="rent-now">Rent now</button>
		</section>
		</div>`;
		}
	}

	class CarList {
		constructor() {
			this.cars = [];
		}

	async FetchData() {
		this.cars = [
			{
				id: 1,
				name: "Toyota Fortuner 2023",
				image: "app/assets/images/toyota-car.png",
				type: "SUV",
				seats: 5,
				mileage: "unlimited miles",
				fuelEfficiency: "30km/l",
				feature: "GPS",
				price: {
					day: 100.35,
					total: 301.04,
				},
			},
			{
				id: 2,
				name: "Honda Civic 2023",
				image: "app/assets/images/honda-civic.png",
				category: "Economy",
				seats: 5,
				mileage: "unlimited miles",
				fuelEfficiency: "30km/l",
				feature: "GPS",
				price: {
					day: 80.5,
					total: 240.75,
				},
			},
			{
				id: 3,
				name: "Mercedes-Benz E-Class 2023",
				image: "app/assets/images/mercedes-benz-e-class.png",
				category: "Standard",
				seats: 5,
				mileage: "limited miles",
				fuelefficiency: "20km/l",
				feature: "GPS",
				price: {
					day: 180.25,
					total: 540.75,
				},
			},
			{
				id: 4,
				name: "BMW 7 Series 2023",
				image: "app/assets/images/bmw-7-series.png",
				category: "Premium",
				seats: 4,
				mileage: "limited miles",
				fuelefficiency: "18km/l",
				feature: "GPS",
				price: {
					day: 300.5,
					total: 601.5,
				},
			},
			{
				id: 5,
				name: "Tesla Model S 2023",
				image: "app/assets/images/tesla-model-s.png",
				category: "Luxury",
				seats: 5,
				mileage: "limited miles",
				fuelefficiency: "25km/l",
				feature: "GPS",
				price: {
					day: 400.5,
					total: 1201.5,
				},
			},
			{
				id: 6,
				name: "Porsche 911 2023",
				image: "app/assets/images/porsche-911.png",
				category: "Sports Car",
				seats: 2,
				mileage: "limited miles",
				fuelefficiency: "22km/l",
				feature: "GPS",
				price: {
					day: 340.5,
					total: 1000.5,
				},
			},
			{
				id: 7,
				name: "Lamborghini Huracan 2023",
				image: "app/assets/images/lamborghini-huracan.png",
				category: "Sports Car",
				seats: 2,
				mileage: "limited miles",
				fuelefficiency: "15km/l",
				feature: "GPS",
				price: {
					day: 300.5,
					total: 901.5,
				},
			},
			{
				id: 8,
				name: "Volvo S90 2023",
				image: "app/assets/images/volvo-s90.png",
				category: "Premium",
				seats: 5,
				mileage: "limited miles",
				fuelefficiency: "22km/l",
				feature: "GPS",
				price: {
					day: 200.5,
					total: 601.5,
				},
			},
		];
		this.dataFetched = true; // Set the flag to true after fetching data
	}
	

	filterByCategory(category) {
        return this.cars.filter((car) => car.category === category);
    }
}
const CarListInstance = new CarList();
document.addEventListener("DOMContentLoaded", async () => {
    const carContainer = document.querySelector('.car');
    const categorySection = document.querySelector('.category');

		const urlParams = new URLSearchParams(window.location.search);
		const initialCategory = urlParams.get('category');

    const CarListInstance = new CarList();
    await CarListInstance.FetchData();

		// Filter and render cars based on the initial category from the URL
		if (initialCategory) {
			const checkboxes = document.querySelectorAll('.category input[type="checkbox"]');
			checkboxes.forEach((checkbox) => {
				if (checkbox.dataset.category === initialCategory) {
					checkbox.checked = true;
				}
			});
			const filteredCars = CarListInstance.filterByCategory(initialCategory);
			renderCars(filteredCars);
		} else {
			renderCars(CarListInstance.cars);
		}

		// Handle category filter
		categorySection.addEventListener('change', (event) => {
			if (event.target.type === 'checkbox') {
				const selectedCategory = event.target.dataset.category;

				// Clear existing cars
				carContainer.innerHTML = '';

				// Filter and render cars for the selected category
				if (event.target.checked) {
					const filteredCars = CarListInstance.filterByCategory(selectedCategory);
					renderCars(filteredCars);

					// Update the URL
					urlParams.set('category', selectedCategory);
				} else {
					// If the checkbox is unchecked, render all cars
					renderCars(CarListInstance.cars);

					// Update the URL
					urlParams.delete('category');
				}

				const newUrl = window.location.pathname + '?' + urlParams.toString();
				history.pushState(null, null, newUrl);
			}
		});

		function renderCars(cars) {
			cars.forEach((car) => {
				const carInstance = new Car(car);
				const carHTML = carInstance.Render();
				carContainer.insertAdjacentHTML('beforeend', carHTML);
			});
		}
	});
