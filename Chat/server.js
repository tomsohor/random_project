if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const passport = require("passport");
const part = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");
const methodOverride = require("method-override");

const app = express();
const port = process.env.PORT;
const db = process.env.dbURL;

const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const message = require("./models/message");

//session set up
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// view config
app.set("view engine", "ejs");
app.set("views", part.join(__dirname, "views/pages"));
app.use(express.static("public"));

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  // .then(() => console.log("connected to db"))
  .catch((e) => console.log(e));

// this socket for main page

// io.on("connection", (socket) => {
//   socket.on("chat message", (msg) => {
//     io.emit("chat message", msg);
//   });
// });

const nsp = io.of("/chat");
nsp.on("connection", (socket) => {
  // console.log("someone connected");

  message.find().then((mes) => {
    socket.emit("chat History", mes);
  });

  socket.on("chat message", (data) => {
    message
      .create({ sender: data[0], content: data[1] })
      .then(() => console.log("message inserted"))
      .catch((e) => console.log(e));
    socket.emit("chat message", data);
  });
});

app.use("/", require("./routes/routes"));

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
