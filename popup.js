//chrome.processes.getProcessInfo([], false, function(processes) {
//    for(i in processes){
//        console.log("process: "+processes[i].id);
//        console.log("process type: "+processes[i].type);
//        console.log("process profile: "+processes[i].profile);
//        for(l in processes[i].tasks){
//            console.log("process task: "+processes[i].tasks[l]);
//        }
//    }
//});

//chrome.windows.getAll(function(windows){
//    for(i in windows){
//        //console.log(windows);
//        console.log("window: "+windows[i].id);
//    }
//});
//
//chrome.windows.getAll({populate:true, windowTypes:['normal', 'app', 'popup', 'panel', 'devtools']}, function(windows){
//  windows.forEach(function(window){
//    window.tabs.forEach(function(tab){
//      //collect all of the urls here, I will just log them instead
//      console.log( "id : " + tab.id + tab.url + " name : " + tab.title);
//    });
//  });
//});

var index=1;
chrome.tabs.query({ currentWindow: true}, function (tabs) {
    //chrome.tabs.update(tabs[0].id, {"title": "1"});
    tabs.forEach(function(tab){
        var re = new RegExp("^(\\d)+(.*)");
        var tabRegxs = re.test(tab.title);
        console.log(tab);
        console.log(tabRegxs);
        newIndex = index;
        if (!tabRegxs) {
            var re = new RegExp("chrome:\\/\\/.*");
            if (re.test(tab.url)) {
                return;
            }
            var newTitle = newIndex + " " + tab.title;
            chrome.tabs.executeScript(tab.id,{code:"parent.document.title = '" + newTitle + "'"});
            console.log("false with : " + newTitle);
            index++;
        } else {
            var newTitle = tab.title.replace(/^(\d)+(.*)/i, newIndex + "$2");
            console.log(tab.index);
            chrome.tabs.executeScript(tab.id,{code:"parent.document.title = '" + newTitle + "'"});
            index++;
        }
    });
});
