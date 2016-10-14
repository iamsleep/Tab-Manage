function updateTableIndex() {
    chrome.tabs.query({ currentWindow: true}, function (tabs) {
        //chrome.tabs.update(tabs[0].id, {"title": "1"});
        var index=1;
        tabs.forEach(function(tab){
            var re = new RegExp("^(\\d)+(.*)");
            var tabRegxs = re.test(tab.title);
            newIndex = index;
            if (!tabRegxs) {
                var re = new RegExp("chrome:\\/\\/.*");
                if (re.test(tab.url)) {
                    return;
                }
                var newTitle = newIndex + " " + tab.title;
                chrome.tabs.executeScript(tab.id,{code:"parent.document.title = '" + newTitle + "'"});
                index++;
            } else {
                var newTitle = tab.title.replace(/^(\d)+(.*)/i, newIndex + "$2");
                chrome.tabs.executeScript(tab.id,{code:"parent.document.title = '" + newTitle + "'"});
                index++;
            }
        });
    });
}
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    updateTableIndex();
});

chrome.tabs.onMoved.addListener(function(tabId, moveInfo) {
    updateTableIndex();
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
    updateTableIndex();
});

chrome.tabs.onDetached.addListener(function(tabId, detachInfo) {
    updateTableIndex();
});

chrome.tabs.onAttached.addListener(function(tabId, detachInfo) {
    updateTableIndex();
});
