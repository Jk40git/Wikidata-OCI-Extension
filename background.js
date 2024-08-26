/** @format */

// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//     if (message.text) {
//       console.log("Selected Text: ", message.text);
//     }
//   });

// background.js

// chrome.runtime.onMessage.addListener(function (message, sender) {
//   if (message.text) {
//     console.log('Selected Text: ', message.text);
//     chrome.storage.local.set({ selectedText: message.text });
//     chrome.action.openPopup(); // Open the popup to show the selected text
//   }
// });


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getSelectedText') {
      sendResponse({ text: selectedText });
  } else if (request.action === 'copyText') {
      copyToClipboard(request.text);
      sendResponse({ status: 'copied' });
  } else if (request.text) {
      selectedText = request.text;
  }
});

function copyToClipboard(text) {
  const input = document.createElement('textarea');
  document.body.appendChild(input);
  input.value = text;
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
}
