divWrapper = document.createElement("div");
iframe = document.createElement("iframe");
iframe.src = chrome.extension.getURL("pages/tab-manage.html");
iframe.setAttribute('class', 'tabManage tabManageComponentHidden');
divWrapper.appendChild(iframe);
document.documentElement.appendChild(iframe);
