class Cards {
    constructor() {}
  
    async fetchData() {
      try {
        const response = await fetch("/assets/scripts/modules/cards.json");
        const jsonData = await response.json();
        console.log(jsonData);
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
      this.id = card.id;
      this.img = card.img;
      this.title = card.title;
      this.body = card.body;
      this.link = card.link;
    }
  
    render() {
      return `
          <div class="card__image" style="background-image: url('${this.img}') ;" id="${this.id}">
            <div class="card__image__details">
              <p class="text__title">${this.title}</p>
              <p class="text__body">${this.body}</p>
            </div>
            <button class="card__image__button" onclick="addToSelected('${this.id}', '${this.title}', '${this.img}', '${this.body}', '${this.link}')">Add to List</button>
          </div>
        `;
    }
  }
  
  const cards = new Cards();
  cards.init();
  
  function addToSelected(id, title, img, body, link) {
    const selectedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];
    const isCardAlreadySelected = selectedItems.some(
      (item) => item.id === id);
  
    if (!isCardAlreadySelected) {
      selectedItems.push({id, title, img, body, link });
      localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
    }
  }
  
  function updateSelectedItemsCount() {
    const selectedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];
    const count = selectedItems.length;
  
    const countBubble = document.getElementById("selectedItemsCount");
    countBubble.textContent = count;
    countBubble.style.display = count > 0 ? "block" : "none";
  }

  function redirectToSelected() {
    const selectedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];
  
    if (selectedItems.length > 0) {
      try {
        window.location.href = "map.html";
      } catch (error) {
        console.error("Error redirecting:", error);
      }
    } else {
      alert("Please select at least one item before checking selected items.");
    }
  }