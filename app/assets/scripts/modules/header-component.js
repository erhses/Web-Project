class HeaderComponent extends HTMLElement {
    constructor() {
        super();
        //implementation
    }

    connectedCallback() {
        this.innerHTML = `
        <nav class="navigation">
      <section class="navigation__img"><a href="/"><img src="app/assets/images/findme.png" alt=""
            style="width: 5rem;"></a></section>
      <div class="main_list" id="mainList">
        <ul class="navigation__items">
          <li><a href="/">Home</a></li>
          <li><a href="map">Explore</a></li>
          <li><a href="services">Services</a></li>
          <li><a href="login">Login</a>
            <ul>
              <li><a href="profile">Profile</a></li>
              <li><a href="login">Sign In</a></li>
              <li><a href="register">Sign Up</a></li>
              <li>Sign Out</li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="media_button">
        <button class="main_media_button" id="media">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
    `
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

window.customElements.define('header-component', HeaderComponent);