$("#submitBtn").click(function () {
  var password = $("#password").val();
  var confirmPassword = $("#confirm_password").val();
  if (password != confirmPassword) {
    alert("Passwords does not match.");
    return false;
  }
  return true;
});
