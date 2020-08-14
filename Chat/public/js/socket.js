var socket = io("/chat");
$("form").submit(function (e) {
  e.preventDefault(); // prevents page reloading
  socket.emit("chat message", [user, $("#m").val()]);
  $("#m").val("");
  return false;
});
socket.on("chat message", function (msg) {
  $("#messages").append(
    $("<li>").append(
      $("<span>")
        .text(msg[0] + " |")
        .addClass("chip sender" + msg[0])
        .append($("<span>").text(msg[1]).addClass("chip content"))
    )
  );
});
socket.on("chat History", function (msg) {
  $("#messages").find("li").remove();
  $.each(msg, function (i) {
    $("#messages").append(
      $("<li>").append(
        $("<span>")
          .text(msg[i]["sender"] + " |")
          .addClass("chip sender" + msg[i]["sender"])
          .append($("<span>").text(msg[i]["content"]).addClass("chip content"))
      )
    );
  });
});
