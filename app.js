import express from "express";
import path from "node:path";

const app = express();

const __dirname = import.meta.dirname;
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/new", (req, res) => {
  res.render("form");
});

app.post("/new", (req, res) => {
  messages.push({
    text: req.body.messageText,
    user: req.body.messageUser,
    added: new Date(),
  });
  res.redirect("/");
});

app.get("/detail/:text/:user/:added", (req, res) => {
  res.render("detail", { info: req.params });
});

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

app.get("/", (req, res) => {
  res.render("index", { title: "Mini Messageboard", messages: messages });
});

const hostname = "localhost";
const PORT = 8080;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }

  console.log(
    `mini-message-board -- Server running at http://${hostname}:${PORT}/`,
  );
});
