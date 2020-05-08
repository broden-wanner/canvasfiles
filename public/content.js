'use strict';

// Create the sidepanel
const sidepanel = document.createElement('div');
sidepanel.style.background = 'white';
sidepanel.style.height = '100%';
sidepanel.style.width = '0px';
sidepanel.style.position = 'fixed';
sidepanel.style.top = '0px';
sidepanel.style.right = '0px';
sidepanel.style.zIndex = '9000000000000000000';
sidepanel.setAttribute('id', 'root');
document.body.appendChild(sidepanel);

function toggle() {
  if (sidepanel.style.width == '0px') {
    sidepanel.style.width = '400px';
  } else {
    sidepanel.style.width = '0px';
  }
}

// Add toggle listener
chrome.runtime.onMessage.addListener(({ message }, sender) => {
  if (message === 'toggle') {
    toggle();
  }
});
