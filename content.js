document.addEventListener('mouseup', function() {
    const selectedText = window.getSelection().toString();
    if (selectedText) {
      chrome.runtime.sendMessage({ text: selectedText });
    }
  });
  