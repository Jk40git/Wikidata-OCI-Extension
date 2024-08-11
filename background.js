/** @format */

// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//     if (message.text) {
//       console.log("Selected Text: ", message.text);
//     }
//   });

// background.js

chrome.runtime.onMessage.addListener(function (message, sender) {
  if (message.text) {
    console.log('Selected Text: ', message.text);
    chrome.storage.local.set({ selectedText: message.text });
    chrome.action.openPopup(); // Open the popup to show the selected text
  }
});
