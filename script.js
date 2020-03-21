// CONST
const SECTION = document.querySelectorAll("body .section");
const MENU = document.getElementById("menu");
const MENU_LIST_ITEM = MENU.querySelectorAll("#menu li a");
const MENU_ITEM = MENU.querySelectorAll("li a");
const PORTFOLIO_TAB = document.getElementById("portfolio-tabs");
const PORTFOLIO_TAB_ITEM = PORTFOLIO_TAB.getElementsByTagName("li");
const PORTFOLIO_PROJECT = document.querySelector(".projects");
const PORTFOLIO_PROJECT_ITEM = PORTFOLIO_PROJECT.querySelectorAll(
  ".project img"
);
const VERTICAL_PHONE = document.querySelector(".phone-vertical-block");
const HORIZONTAL_PHONE = document.querySelector(".phone-horizontal-block");
const VERTICAL_PHONE_SCREEN = document.querySelector(".phone-vertical-screen");
const HORIZONTAL_PHONE_SCREEN = document.querySelector(
  ".phone-horizontal-screen"
);
const SUBMIT_BUTTON = document.querySelector(".submit-form-button");
const MODAL = document.querySelector(".modal-container");
const MODAL_BUTTON = document.querySelector(".modal-button");
const INPUT_NAME = document.getElementById("name");
const INPUT_EMAIL = document.getElementById("email");
const INPUT_SUBJECT = document.getElementById("subject");
const INPUT_DESCRIPTION = document.getElementById("description");
const MODAL_SUBJECT = document.querySelector(".modal-subject");
const MODAL_DESCRIPTION = document.querySelector(".modal-description");
const NEXT_SLIDER_BUTTON = document.querySelector(".slider-next img");
const PREV_SLIDER_BUTTON = document.querySelector(".slider-prev img");
const HEADER_NAV = document.querySelector(".header-nav");
const MOBILE_MENU = document.querySelector(".mobile-menu");

// LIST ITEMS NAVIGATION
function activateItem(listContainer, listItem, fnCallback) {
  for (var i = 0; i < listItem.length; i++) {
    listItem[i].addEventListener("click", function() {
      var el = listContainer.querySelectorAll(".active");
      if (fnCallback) fnCallback();
      if (el.length > 0) {
        el[0].className = el[0].className.replace("active", "");
      }
      this.className += "active";
    });
  }
}

// LIST ITEMS TO SECTIONS NAVIGATION
document.addEventListener("scroll", onScroll);
function onScroll(event) {
  const CURRENT_POSITION = window.scrollY;
  SECTION.forEach(el => {
    if (
      el.offsetTop <= CURRENT_POSITION + 95 &&
      el.offsetTop + el.offsetHeight > CURRENT_POSITION
    ) {
      MENU_LIST_ITEM.forEach(a => {
        a.classList.remove("active");
        if (el.getAttribute("id") === a.getAttribute("href").substring(1)) {
          a.classList.add("active");
        }
      });
    }
  });
}

// PORTFOLIO IMAGE SHUFFLE
function shuffle() {
  let portfolioWorks = [...document.querySelectorAll(".project")];
  let portfolio = document.querySelector(".projects");
  let lastElem = portfolioWorks.pop();
  portfolioWorks.unshift(lastElem);
  portfolio.prepend(lastElem);
}

// HEADER NAVIGATION
activateItem(MENU, MENU_ITEM);

// PORTFOLIO IMAGE NAVIGATION
activateItem(PORTFOLIO_PROJECT, PORTFOLIO_PROJECT_ITEM);

// PORTFOLIO TABS NAVIGATION
activateItem(PORTFOLIO_TAB, PORTFOLIO_TAB_ITEM, shuffle);

// VERTICAL PHONE SCREEN ACTION
VERTICAL_PHONE.addEventListener("click", () => {
  VERTICAL_PHONE_SCREEN.classList.toggle("no-active");
});

// HORIZONTAL PHONE SCREEN ACTION
HORIZONTAL_PHONE.addEventListener("click", () => {
  HORIZONTAL_PHONE_SCREEN.classList.toggle("no-active");
});

// MODAL SHOW
SUBMIT_BUTTON.addEventListener("click", () => {
  if (!isValidInputs()) return;
  INPUT_NAME.classList.remove("error");
  INPUT_EMAIL.classList.remove("error");
  const subject = INPUT_SUBJECT.value.toString();
  if (subject === "") {
    MODAL_SUBJECT.innerText = "Без темы";
  } else {
    MODAL_SUBJECT.innerText = "Тема: " + subject;
  }
  const description = INPUT_DESCRIPTION.value.toString();
  if (description === "") {
    MODAL_DESCRIPTION.innerText = "Без описания";
  } else {
    MODAL_DESCRIPTION.innerText = "Описание: " + description;
  }
  MODAL.classList.add("active");
});

// INPUT VALIDATION
function isValidInputs() {
  let isValidName = INPUT_NAME.value;
  let isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    INPUT_EMAIL.value
  );
  let isFieldsValid = !!isValidName && isValidEmail;
  if (isFieldsValid) {
  } else {
    showErrorInput(isValidName, isValidEmail);
  }
  return isFieldsValid;
}

// SHOW INPUT ERRORS
function showErrorInput(isValidName, isValidEmail) {
  if (!isValidName) {
    INPUT_NAME.classList.add("error");
  } else {
    INPUT_NAME.classList.remove("error");
  }
  if (!isValidEmail) {
    INPUT_EMAIL.classList.add("error");
  } else {
    INPUT_EMAIL.classList.remove("error");
  }
}

// MODAL HIDE
MODAL_BUTTON.addEventListener("click", () => {
  MODAL.classList.remove("active");
  INPUT_NAME.value = "";
  INPUT_EMAIL.value = "";
  INPUT_SUBJECT.value = "";
  INPUT_DESCRIPTION.value = "";
});

// SLIDER
let items = document.querySelectorAll(".slider .card");
let currentItem = 0;
let isEnabled = true;
function changeCurrentItem(n) {
  currentItem = (n + items.length) % items.length;
}
function hideItem(direction) {
  isEnabled = false;
  items[currentItem].classList.add(direction);
  items[currentItem].addEventListener("animationend", function() {
    this.classList.remove("active", direction);
  });
}
function showItem(direction) {
  items[currentItem].classList.add("next", direction);
  items[currentItem].addEventListener("animationend", function() {
    this.classList.remove("next", direction);
    this.classList.add("active");
    isEnabled = true;
  });
}
function nextItem(n) {
  hideItem("to-left");
  changeCurrentItem(n + 1);
  showItem("from-right");
}

function previousItem(n) {
  hideItem("to-right");
  changeCurrentItem(n - 1);
  showItem("from-left");
}

PREV_SLIDER_BUTTON.addEventListener("click", function() {
  if (isEnabled) {
    previousItem(currentItem);
  }
});

NEXT_SLIDER_BUTTON.addEventListener("click", function() {
  if (isEnabled) {
    nextItem(currentItem);
  }
});

// MOBILE MENU TOGGLE ACTIVE CLASS
MOBILE_MENU.addEventListener("click", () => {
  HEADER_NAV.classList.toggle("active");
});
