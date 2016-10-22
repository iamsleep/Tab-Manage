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

chrome.windows.onFocusChanged.addListener(function(windowId) {
    updateTableIndex();
});

chrome.tabs.onActivated.addListener(function(activeInfo){
    updateTableIndex();
});

chrome.tabs.onCreated.addListener(function( tab) {
    chrome.tabs.query({active: true}, function (tabs) {
        if (chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError.message);
        } else {
            var removeHidden = 'var c =parent.document.getElementsByClassName(\'tabManage\'); console.log(c); c[0].setAttribute(\'class\', \'tabManage\')';
            activeTab = tabs[0];
            chrome.tabs.executeScript(tabs[0].id,{allFrames: true, code: removeHidden});
        }
    });
});
