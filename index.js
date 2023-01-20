const loginBtn = document.querySelector(".login-form button");
const createContactBtn = document.querySelector(".create-contact-form button");
const table = document.querySelector("table");

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

loginBtn.addEventListener("click", () => {
  const name = document.querySelector(".name");
  const password = document.querySelector(".password");

  if (!name.value) {
    hideTable();
    alert("Please enter login name");
    return;
  } else if (!password.value) {
    hideTable();
    alert("Please enter password");
    return;
  }

  let obj = {
    login: name.value,
    password: password.value,
  };
  getLoginAccess(obj);
});

createContactBtn.addEventListener("click", () => {
  const name = document.querySelector(".create-contact-form .name");
  const phone = document.querySelector(".create-contact-form .phone");

  if (!name.value) {
    alert("Please enter name");
    return;
  } else if (!phone.value) {
    alert("Please enter phone");
    return;
  }

  let obj = {
    name: name.value,
    phone: phone.value,
  };
  if (getCookie("userId")) {
    alert("Not authenticated");
    return;
  }
  createContact(obj.name, obj.phone);
  alert("contact created");
});

async function getLoginAccess(obj) {
  let response = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  });

  if (!response.ok) {
    hideTable();
  } else {
    renderContacts();
  }
}

async function createContact(name, phone) {
  await fetch("/contacts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, phone }),
  });
}

function hideTable() {
  table.style.visibility = "hidden";
}

async function renderContacts() {
  table.style.visibility = "visible";
  let response = await fetch("/contacts", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  let { contacts } = await response.json();
}
