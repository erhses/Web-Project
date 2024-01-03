
class Cards {
  constructor() {}

  async fetchData() {
    try {
      const response = await fetch("app/assets/scripts/modules/cards.json");
      const jsonData = await response.json();
      console.log(jsonData);
      return jsonData;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  async init() {
    const jsonData = await this.fetchData();

    if (jsonData) {
      const products = jsonData;
      let data = "";
      for (const product of products) {
        const prod = new Info(product);
        data += prod.render();
      }
      document
        .getElementById("cardsplease")
        .insertAdjacentHTML("beforeend", data);
    }
  }
}

class Info {
  constructor(card) {
    this.id = card.id;
    this.img = card.img;
    this.title = card.title;
    this.body = card.body;
    this.link = card.link;
    this.lat = card.lat;
    this.long = card.long;
  }

  render() {
    return `
    <div class="swiper-slide">
        <div class="card__image" style="background-image: url('${this.img}') ;" id="${this.id}">
          <div class="card__image__details">
            <p class="text__title">${this.title}</p>
            <p class="text__body">${this.body}</p>
          </div>
          <button class="card__image__button" onclick="addToSelected('${this.id}', '${this.title}', '${this.img}', '${this.body}', '${this.link}', '${this.long}', '${this.lat}')">Add to List</button>
        </div>
        </div>
      `;
  }
}

const cards = new Cards();
cards.init();

function addToSelected(id, title, img, body, link, lat, long) {
  const selectedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];
  const isCardAlreadySelected = selectedItems.some((item) => item.id === id);

  if (!isCardAlreadySelected) {
    lat = parseFloat(lat);
    long = parseFloat(long);
    const itemToAdd = { id, title, img, body, link, lat, long };

    selectedItems.push(itemToAdd);
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
  }
}

function redirectToSelected() {
  const selectedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];

  if (selectedItems.length > 0) {
    try {
      window.location.href = "map";
    } catch (error) {
      console.error("Error redirecting:", error);
    }
  } else {
    alert("Please select at least one item before checking selected items.");
  }
}

class Selected {
  constructor(card, showRemoveButton) {
    this.img = card.img;
    this.title = card.title;
    this.body = card.body;
    this.link = card.link;
    this.long = card.long;
    this.lat = card.lat;
    this.showRemoveButton = showRemoveButton;
  }

  render() {
    return `
    <div class="swiper-slide">
        <div class="card__image" style="background-image: url('${this.img}') ;" id="${this.id}">
          <div class="card__image__details">
            <p class="text__title">${this.title}</p>
            <p class="text__body">${this.body}</p>
          </div>
          ${this.showRemoveButton ? `<button class="card__image__button" style="background-color: red;" onclick="removeItem('${this.title}')">Remove from List</button>` : ''}
        </div>
    </div>`;
  }
}

function displaySelectedItems() {
  const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
  const selectedItemsContainer = document.getElementById('selectedItems');

  selectedItemsContainer.innerHTML = '';
  
  for (const item of selectedItems) {
    const itemContainer = document.createElement('div');
    itemContainer.classList.add('swiper-slide', 'selected-item');

    const prod = new Selected(item, true);
    itemContainer.innerHTML = prod.render();
    selectedItemsContainer.appendChild(itemContainer);
  }

  const removeAllButton = document.getElementById('removeall');
  removeAllButton.style.display = selectedItems.length > 0 ? 'block' : 'none';
}


function removeAll() {
  localStorage.removeItem('selectedItems');
  displaySelectedItems();
}

function removeItem(title) {
  const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
  const updatedItems = selectedItems.filter((item) => item.title !== title);

  localStorage.setItem('selectedItems', JSON.stringify(updatedItems));
  displaySelectedItems();
}

displaySelectedItems();