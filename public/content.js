'use strict';

const SIDEPANEL_WIDTH = '400px';

// Create the sidepanel for the React App to use
const sidepanel = document.createElement('div');
sidepanel.style.background = 'transparent';
sidepanel.style.height = '100%';
sidepanel.style.width = SIDEPANEL_WIDTH;
sidepanel.style.position = 'fixed';
sidepanel.style.top = '0px';
sidepanel.style.right = '0px';
sidepanel.style.zIndex = '9000000000000000000';
sidepanel.setAttribute('id', 'root');
document.body.appendChild(sidepanel);
