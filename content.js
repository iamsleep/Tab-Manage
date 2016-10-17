//alert('123');
iframe = document.createElement("iframe");
iframe.src = chrome.extension.getURL("popup.html");
document.documentElement.appendChild(iframe);

