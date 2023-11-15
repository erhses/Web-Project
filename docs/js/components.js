class Cards {
  constructor() {}

  async fetchData() {
    try {
      const response = await fetch("/docs/js/cards.json");
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error("Error fetching data:", error);
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
    this.img = card.img;
    this.title = card.title;
    this.body = card.body;
    this.link = card.link;
  }

  render() {
    return `
        <div class="card__image" style="background-image: url(${this.img});">
          <div class="card__image__details">
            <p class="text__title">${this.title}</p>
            <p class="text__body">${this.body}</p>
          </div>
          <button class="card__image__button" onclick="addToSelected('${this.title}', '${this.img}', '${this.body}', '${this.link}')">Add to List</button>
        </div>
      `;
  }
}

const cards = new Cards();
cards.init();

function addToSelected(title, img, body, link) {
  const selectedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];
  const isCardAlreadySelected = selectedItems.some(
    (item) => item.title === title
  );

  if (!isCardAlreadySelected) {
    selectedItems.push({ title, img, body, link });
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
  }
}

function redirectToSelected() {
  window.location.href = "/docs/map.html";
}
