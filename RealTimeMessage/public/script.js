// const socket = io();

// socket.on("chat-messages", (data) => {
//   console.log(data);
// });

$(function () {
  const socket = io();
  $("form").submit(function (e) {
    e.preventDefault(); // prevent page reloading
    socket.emit("chat message", $("#m").val());
    $("#m").val("");
    return false;
  });
  socket.on("chat message", function (msg) {
    $("#messages").append("<li>" + msg + "</li>");
  });
});
