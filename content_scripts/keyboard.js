//document.addEventListener("keydown", keyDownTextField, false);

var map = {};

onkeydown = onkeyup = function(e){
//function keyDownTextField(e){
    var keyCode = e.key;
    //alert("You hit the enter key." + keyCode);
    map[e.key] = e.type == 'keydown';
    //alert(map);
    //console.log(map);
}
