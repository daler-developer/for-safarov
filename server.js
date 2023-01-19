const fs = require("fs");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use("/static", express.static(__dirname));

app.get("/", (req, res) => {
  return res.sendFile(__dirname + "/index.html");
});

app.post("/login", (req, res) => {
  const req_body = req.body;

  let users = fs.readFileSync("users.json", "utf8");
  users = JSON.parse(users);

  const user = users.find(
    (el) => el.login == req_body.login && el.password == req_body.password
  );

  if (user) {
    return res.cookie("userId", user.id).json({ message: "User found" });
  }

  return res.status(401).json({ message: "Auth error" });
});

app.get("/contacts", (request, res) => {
  const currentUserId = Number(request.cookies.userId);

  if (!currentUserId) {
    return res.status(401).json({ message: "Auth error" });
  }

  let users = fs.readFileSync("users.json", "utf8");

  users = JSON.parse(users);

  let user = users.find((u) => u.id === currentUserId);

  return res.json({ contacts: user.contacts });
});

app.post("/contacts", (req, res) => {
  const body = req.body;
  const currentUserId = Number(req.cookies.userId);

  if (!currentUserId) {
    return res.status(401).json({ message: "Auth error" });
  }

  let users = fs.readFileSync("users.json", "utf8");

  users = JSON.parse(users);

  let user = users.find((u) => u.id === currentUserId);

  user.contacts.push({ name: body.name, phone: body.phone });

  fs.writeFileSync("users.json", JSON.stringify(users), { encoding: "utf8" });

  return res.json({ message: "contact created" });
});

app.listen(3000);
