//creating HTML
/*
let cardsArray = [
  [
    "portfolio-card",
    "card-body",
    "./assets/portfolio-1.jpg",
    "card-popup-box",
    "Web development",
    "Food website",
  ],
  [
    "portfolio-card",
    "card-body",
    "./assets/portfolio-1.jpg",
    "card-popup-box",
    "Web development",
    "Food website",
  ],
];

for (let i = 0; i < 2; i++) {
  const newCard = document.createElement("div");
  newCard.classList.add(cardsArray[i][0]);
  const cardBody = document.createElement("div");
  cardBody.classList.add(cardsArray[i][1]);
  const cardImg = document.createElement("img");
  cardImg.src = cardsArray[i][2];
  const cardPopUp = document.createElement("div");
  cardPopUp.classList.add(cardsArray[i][3]);
  const heading = document.createElement("div");
  const text = cardsArray[i][4];
  const fillIn = document.createTextNode(text);
  const subHeading = document.createElement("h3");
  const subText = cardsArray[i][5];
  const fillInSub = document.createTextNode(subText);
  subHeading.appendChild(fillInSub);
  heading.appendChild(fillIn);

  cardPopUp.appendChild(heading);
  cardPopUp.appendChild(subHeading);
  cardBody.appendChild(cardImg);
  cardBody.appendChild(cardPopUp);
  newCard.appendChild(cardBody);

  document.getElementById("portfolio-grid").appendChild(newCard);
}

*/

// MODALS

/*
const arrayOfModals = [
  "modal",
  "modal-dialog",
  "modal-header",
  "modal-body",
  "img-wrapper",
  "text-wrapper",
];
const arrayOfContent = [
  ["web-1", "web-2", "web-3"],
  ["Web Project 1", "Web Project 2"],
  ["./assets/portfolio-1.jpg", "./assets/portfolio-2.jpg"],
  ["My first awesome website", "Another awesome website"],
  ["Blah Blah Blah", "Blah Blah Blah"],
];

for (let i = 0; i < 2; i++) {
  const modalDiv = document.createElement("div");
  modalDiv.classList.add(arrayOfModals[0]);
  modalDiv.setAttribute("id", arrayOfContent[1][i]);
  modalDiv.setAttribute("data-animation", "slideInOutTop");

  const modalDialog = document.createElement("div");
  modalDialog.classList.add(arrayOfModals[1]);

  const modalHeader = document.createElement("header");
  modalHeader.classList.add(arrayOfModals[2]);

  const header = document.createElement("h3");
  const headerText = arrayOfContent[i][1];
  const fillIn = document.createTextNode(headerText);
  header.appendChild(fillIn);

  const close = document.createElement("i");
  close.classList.add("fas");
  close.classList.add("fa-times");

  close.setAttribute("data-close", close);

  const modalBody = document.createElement("div");
  modalBody.classList.add(arrayOfModals[3]);

  const imgWrapper = document.createElement("div");
  imgWrapper.classList.add(arrayOfModals[4]);

  const modalImg = document.createElement("img");
  modalImg.src = arrayOfContent[2][i];

  const textWrapper = document.createElement("div");
  textWrapper.classList.add(arrayOfModals[5]);

  const paragraph = document.createElement("p");
  const paragraphText = arrayOfContent[4][i];
  const fillPar = document.createTextNode(paragraphText);
  paragraph.appendChild(fillPar);

  textWrapper.appendChild(paragraph);
  modalBody.appendChild(textWrapper);
  imgWrapper.appendChild(modalImg);
  modalBody.appendChild(imgWrapper);
  modalDialog.appendChild(modalBody);
  modalHeader.appendChild(close);
  modalHeader.appendChild(header);
  modalDialog.appendChild(modalHeader);
  modalDiv.appendChild(modalDialog);
  document.body.appendChild(modalDiv);
}
*/

//para.innerHTML = "This is a paragraph.";

const theme = "theme";
const dataTheme = "data-theme";
const themeTab = ".theme-tab";
const switcherBtn = ".switcher-btn";
const dark = "dark";
const light = "light";
const open = "open";
const active = "active";

const modalOpen = "[data-open]";
const modalClose = "[data-close]";
const isVisible = "is-visible";

const dataFilter = "[data-filter]";
const portfolioData = "[data-item]";

const portfolioGrid = ".portfolio-grid";

const root = document.documentElement;

//

// Theme
const toggleTheme = document.querySelector(themeTab);
const switcher = document.querySelectorAll(switcherBtn);
const currentTheme = localStorage.getItem(theme);

// Portfolio

const filterLink = document.querySelectorAll(dataFilter);
const portfolioItems = document.querySelectorAll(portfolioData);
const searchBox = document.querySelector("#search");

// MODAL
const openModal = document.querySelectorAll(modalOpen);
const closeModal = document.querySelectorAll(modalClose);

//toggle

const setActive = (elm, selector) => {
  if (document.querySelector(`${selector}.${active}`) !== null) {
    document.querySelector(`${selector}.${active}`).classList.remove(active);
    elm.classList.add(active);
  }
};

const setTheme = (val) => {
  if (val === dark) {
    root.setAttribute(dataTheme, dark);
    localStorage.setItem(theme, dark);
  } else {
    root.setAttribute(dataTheme, light);
    localStorage.setItem(theme, light);
  }
};

if (currentTheme) {
  root.setAttribute(dataTheme, currentTheme);
  switcher.forEach((btn) => {
    btn.classList.remove(active);
  });
  if (currentTheme === dark) {
    switcher[1].classList.add(active);
  } else {
    switcher[0].classList.add(active);
  }
}

toggleTheme.addEventListener("click", function () {
  const tab = this.parentElement.parentElement;
  if (!tab.className.includes(open)) {
    tab.classList.add(open);
  } else {
    tab.classList.remove(open);
  }
});

for (const elm of switcher) {
  elm.addEventListener("click", function () {
    const toggle = this.dataset.toggle;
    setActive(elm, switcherBtn);
    setTheme(toggle);
  });
}

searchBox.addEventListener("keyup", (e) => {
  const searchInput = e.target.value.toLowerCase().trim();

  portfolioItems.forEach((card) => {
    if (card.dataset.item.includes(searchInput)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

for (const link of filterLink) {
  link.addEventListener("click", function () {
    setActive(link, ".filter-link");
    const filter = this.dataset.filter;
    portfolioItems.forEach((card) => {
      if (filter === "all") {
        card.style.display = "block";
      } else if (card.dataset.item === filter) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
}

// Modal/Full Site Modal open buttons
for (const elm of openModal) {
  elm.addEventListener("click", function () {
    const modalId = this.dataset.open;
    document.getElementById(modalId).classList.add(isVisible);
  });
}

for (const elm of closeModal) {
  elm.addEventListener("click", function () {
    this.parentElement.parentElement.parentElement.classList.remove(isVisible);
  });
}

// Modal

document.addEventListener("click", (e) => {
  if (e.target === document.querySelector(".modal.is-visible")) {
    document.querySelector(".modal.is-visible").classList.remove(isVisible);
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "Escape") {
    document.querySelector(".modal.is-visible").classList.remove(isVisible);
  }
});

// get elements displayed
const elmsDisplayed = getComputedStyle(root).getPropertyValue(
  "--marquee-elms-displayed"
);
// nodelist.length
const marqueeContent = document.querySelector("ul.marquee-content");

//assign --marquee-elms nodelist.length

root.style.setProperty("--marquee-elms", marqueeContent.children.length);

for (let i = 0; i < elmsDisplayed; i += 1) {
  marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
}
