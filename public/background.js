'use strict';

// Add a listener to show the page action when the host is correct
chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: 'canvas.umn.edu' },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});

// Called when the user clicks on the browser action
chrome.browserAction.onClicked.addListener((tab) => {
  // Send a message to the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { message: 'toggle' });
  });
});

// Add a listener for downloading files
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.downloadList && msg.downloadList.length !== 0) {
    // Download every file in the downloadList array
    for (const f of msg.downloadList) {
      chrome.downloads.download({ url: f.url, filename: `${f.courseName}/${f.display_name}` });
    }
  }
});
