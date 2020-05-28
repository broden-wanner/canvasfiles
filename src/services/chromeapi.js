/**
 * Adds a listener for messages
 * @param {string} msg - message to listen for
 * @param {fn} fn - function to call when message is recieved
 */
export function addMessageListener(msg, fn) {
  // eslint-disable-next-line
  chrome.runtime.onMessage.addListener(({ message }, sender) => {
    if (message === msg) {
      fn();
    }
  });
}

/**
 * Adds a key-value pair object to the storage
 * @param {object} o - the object containing {key:value} pairs to add to storage
 * @param {function} fn - function to call after the value is set
 */
export function storageSet(o, fn) {
  // eslint-disable-next-line
  chrome.storage.sync.set(o, fn);
}

/**
 * Gets the values for each string in keys
 * @param {array[string]} keys - keys to get from storage
 * @param {function} fn - function that does something with the values. takes one argument that contains all the key-value pairs
 */
export function storageGet(keys, fn) {
  // eslint-disable-next-line
  chrome.storage.sync.get(keys, fn);
}

/**
 * Sends a message to the background script to download the files in the list
 * @param {Array[File]} downloadList - a list of files to be downloaded
 */
export function downloadFiles(downloadList) {
  // eslint-disable-next-line
  chrome.runtime.sendMessage({ downloadList: downloadList });
}

/**
 * Shows the current download folder in the file explorer
 */
export function showDownloadFolder() {
  // eslint-disable-next-line
  chrome.runtime.sendMessage({ msg: 'showDownloadFolder' });
}
