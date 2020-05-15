'use strict';

const SIDEPANEL_WIDTH = '400px';

// Create the sidepanel
const sidepanel = document.createElement('div');
sidepanel.style.background = 'white';
sidepanel.style.height = '100%';
sidepanel.style.display = 'none';
sidepanel.style.width = SIDEPANEL_WIDTH;
sidepanel.style.position = 'fixed';
sidepanel.style.top = '0px';
sidepanel.style.right = '0px';
sidepanel.style.zIndex = '9000000000000000000';
// sidepanel.style.overflowY = 'auto';
sidepanel.setAttribute('id', 'root');
document.body.appendChild(sidepanel);

// Open the sidepanel if it has been previously opened
chrome.storage.sync.get(['open'], (value) => {
  if (value.open) {
    sidepanel.style.display = 'block';
  }
});

/**
 * Toggle the side panel to open and set a value in the storage
 */
function togglePanel() {
  if (sidepanel.style.display === 'none') {
    sidepanel.style.display = 'block';
    chrome.storage.sync.set({ open: true });
  } else {
    sidepanel.style.display = 'none';
    chrome.storage.sync.set({ open: false });
  }
}

// Add toggle listener
chrome.runtime.onMessage.addListener(({ message }, sender) => {
  if (message === 'toggle') {
    togglePanel();
  }
});

// Open the port for downloading messaging
const port = chrome.runtime.connect({ name: 'download' });
port.onMessage.addListener((msg) => {
  console.log(msg);
});

/**
 * Sends a message to the background script to download the files in the list
 * @param {Array[File]} downloadList - a list of files to be downloaded
 */
function downloadFiles(downloadList) {
  port.postMessage({ downloadList: downloadList });
}
