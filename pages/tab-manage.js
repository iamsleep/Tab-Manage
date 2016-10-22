function WindowSelect() {
    this.render = function (dialog) {
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var windowOverlay = document.getElementById('window-overlay');
        var windowBox = document.getElementById('window-box');
        windowOverlay.style.display = "block";
        windowOverlay.style.height = winH+"px";
        windowBox.style.left = (winW/2) - (550 * .5)+"px";
        windowBox.style.top = "100px";
        windowBox.style.display = "block";

        document.getElementById("window-select-header").innerHTML = "Do you want change selected window";
        document.getElementById("window-select-body").innerHTML = dialog;
        document.getElementById("window-select-body").innerHTML = '<br><input id="selected_window">';
    }
}

var MyWindow = new WindowSelect();
//MyWindow.render();
//document.addEventListener("load", MyWindow.render());
