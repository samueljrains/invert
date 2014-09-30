var inverted = true;

function updateIcon() {
  inverted = !inverted;
  var path = {19: "icons/19x19.png",
              38: "icons/38x38.png"};
  if (inverted) {
    path = {19: "icons/19x19-inverted.png",
            38: "icons/38x38-inverted.png"};
  }
  chrome.browserAction.setIcon({path: path});
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    invert(tabs[0]);
  });
}

function invert(tab) {
  if (inverted) {
  	chrome.tabs.insertCSS(null, {file: "html_invert.css"});    
  }
  else {
	chrome.tabs.insertCSS(null, {file: "image_invert.css"});    
  }
}

chrome.browserAction.onClicked.addListener(updateIcon);
chrome.tabs.onCreated.addListener(invert);
chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
if (info.status == 'complete') {
	invert(tab);
}
});
updateIcon();