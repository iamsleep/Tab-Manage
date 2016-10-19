document.addEventListener("keydown", keyDownTextField, false);


function keyDownTextField(e) {
var keyCode = e.keyCode;
  if(keyCode==13) {
  alert("You hit the enter key.");
  } else {
  alert("Oh no you didn't.");
  }
}
