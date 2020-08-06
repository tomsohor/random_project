const express = require("express");
const app = express();

const http = require("http").createServer(app);
const io = require("socket.io").listen(http);

const port = 3000;
app.set("views", "./view");
app.set("view engine", "ejs");

// use public folder as static
app.use(express.static("public"));

// use css folder as static
app.use("/css", express.static(__dirname + "/css"));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.render("index.ejs");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

http.listen(port, () => {
  console.log("listen to port 3000");
});
