// document.addEventListener('mouseup', function() {
//     const selectedText = window.getSelection().toString();
//     if (selectedText) {
//       chrome.runtime.sendMessage({ text: selectedText });
//     }
//   });


document.addEventListener('mouseup', function () {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText) {
      // Send the selected text to the background script
      chrome.runtime.sendMessage({ text: selectedText }, function(response) {
          if (chrome.runtime.lastError) {
              console.error(chrome.runtime.lastError.message);
          } else {
              console.log('Text sent to background:', response);
          }
      });
  }
});

  