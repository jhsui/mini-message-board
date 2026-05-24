import express from "express";
import path from "node:path";
import db from "./db/queries.js";

const app = express();

const __dirname = import.meta.dirname;
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/new", (req, res) => {
  res.render("form");
});

app.post("/new", async (req, res) => {
  // messages.push({
  //   text: req.body.messageText,
  //   user: req.body.messageUser,
  //   added: new Date(),
  // });

  await db.insert(req.body.message, req.body.username);
  res.redirect("/");
});

app.get("/detail/:id", async (req, res) => {
  const row = await db.getID(req.params.id);
  res.render("detail", { row });
});

// const messages = [
//   {
//     text: "Hi there!",
//     user: "Amando",
//     added: new Date(),
//   },
//   {
//     text: "Hello World!",
//     user: "Charles",
//     added: new Date(),
//   },
// ];

app.get("/", async (req, res) => {
  const messages = await db.getAll();
  res.render("index", { title: "Mini Messageboard", messages: messages });
});

// const hostname = "localhost";
// const PORT = 8081;
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`mini-message-board server running on port ${PORT}`);
});
