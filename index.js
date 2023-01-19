const btn = document.querySelector("button");

console.log("test");

btn.addEventListener("click", () => {
  const name = document.querySelector(".name");
  const password = document.querySelector(".password");

  if (!name.value) {
    alert("Please enter login name");
    return;
  } else if (!password.value) {
    alert("Please enter password");
    return;
  }

  let obj = {
    login: name.value,
    password: password.value,
  };
  getLoginAccess(obj);
});

async function getLoginAccess(obj) {
  let response = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  });
  response = await response.json();
  if (response.status === 401) {
    alert("error");
  } else {
    // renderContacts();
  }
}

async function createContact(name, phone) {
  let response = await fetch("/contacts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, phone }),
  });
}

async function renderContacts() {
  let response = await fetch("/contacts", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(query),
  });
  let json = await response.json();

  const contacts = json.contacts;
  const ul = document.querySelector("ul");
  ul.innerHTML = null;

  for (let el of contacts) {
    const li = document.createElement("li");
    // li.innerHTML = `<h3>${el.title}</h3>
    //       <h4>${el.price}</h4>`;

    const h3 = document.createElement("h3");
    const h4 = document.createElement("h4");

    h3.textContent = el.title;
    h4.textContent = el.price;

    li.append(h3, h4);

    ul.append(li);
  }
}
