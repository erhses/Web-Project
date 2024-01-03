class CarSaveButton extends HTMLElement {
    constructor() {
        super();
        this.carId = this.getAttribute("carId");
        this.isClicked = JSON.parse(localStorage.getItem(`carSaveButton_${this.carId}`)) || false;
        // console.log(localStorage.getItem(`carSaveButton_${this.carId}`));
        this.carName = this.getAttribute("carName");
        
        this.attachShadow({ mode: 'open' });
        this.#render();
        this.addEventListener('click', () => {
            this.#toggleState();
            this.setAttribute('carId', 123);
            this.setAttribute('carName', this.carName);
        });
    }

    #render() { 
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />  
        <style>
            button {
                background-color: white;
                padding: 0.3rem;
                font-size: 1.5rem;
                border-radius: 50%;
                margin-right: 0.75rem;
                border: none;  
            }
        </style>
        <button><i class="fa-solid fa-heart"></i></button>`;
    }
    #changeColor() {
        const iconElement = this.shadowRoot.querySelector('i');
    
        if (this.isClicked) {
            iconElement.style.setProperty('color', 'black');
        } else {
            iconElement.style.setProperty('color', 'red')
        }
    }

    #toggleState() {
        localStorage.setItem(`carSaveButton_${this.carId}`, JSON.stringify(this.isClicked));
        this.isClicked = !this.isClicked;
        this.#updateCount();
        this.#updateName();
        this.#changeColor();
    }

    #updateCount() {
        const countElement = document.getElementById("save-count");
        // if (!this.isClicked) {
        //     countElement.textContent++;
        //     this.addCarName();
        // } else {
        //     countElement.textContent--;
        //     this.removeCarName();
        // }
        // console.log(localStorage);
        // console.log(localStorage.length);
        var count = 0;
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            if(value === 'true'){
                count++;
            }
            // console.log(`Key: ${key}, Value: ${value}`);
        }
        countElement.textContent = count;
        
    }
    
    #updateName(){
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            if(value === 'true' && key === `carSaveButton_${this.carId}`){
                this.#addCarName();
            } else if(value === 'false' && key === `carSaveButton_${this.carId}`){
                this.#removeCarName();
            }
        }
    }
    
    #addCarName() {
        const newCarName = document.createElement("li");
        newCarName.textContent = this.carName;
        newCarName.id = "car-" + this.carName;
        document.getElementById("namelist").appendChild(newCarName);
    }

    #removeCarName() {
        const oldCarName = document.getElementById("car-" + this.carName);
        if (oldCarName) {
            oldCarName.parentNode.removeChild(oldCarName);
        }
    }

    connectedCallback() {
        console.log("Connected Callback");
        this.#updateCount(); // Initial count update
        this.#toggleState();
        this.#changeColor();
    }

    disconnectedCallback() {
        console.log("Disconnected Callback");
        // Implementation
    }



    attributeChangedCallback(name, oldVal, newVal) {
        console.log(`Attribute "${name}" changed from ${oldVal} to ${newVal}`);
        
        if (name === 'carId' || name === 'carName') {
            // Handle changes related to carId or carName attributes
            this.#updateName();
        }
    }

    adoptedCallback() {
        console.log("Adopted Callback");
        // Implementation
    }
}

window.customElements.define('car-save-button', CarSaveButton);
