class FooterComponent extends HTMLElement {
    constructor() {
        super();
        //implementation
    }

    connectedCallback() {
        this.innerHTML = `
        <footer>
        <div class="footer">
          <div class="footer__one">
            <h3>Suggestions</h3><input class="input" type="email" name="email" placeholder="Enter your email">
            <textarea name="textarea" class="textarea" cols="30" rows="10"
              placeholder="Enter your comment"></textarea><br><button type="submit">submit</button>
          </div>
          <div class="footer__two">
            <h3>About Us</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas voluptas dolorum vitae neque, a
              nesciunt, consectetur voluptatibus nemo, earum esse mollitia debitis tempora! Adipisci blanditiis,
              ut vitae quasi iusto nobis.</p>
          </div>
          <div class="footer__three">
            <h3>Contact Us</h3>
            <p>976 9999 9999</p>
            <p>nomail.com</p>
          </div>
        </div>
        <p class="footer__end">&copy; 2023 copyright</p>
        </footer>
        `;
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

window.customElements.define('footer-component', FooterComponent);