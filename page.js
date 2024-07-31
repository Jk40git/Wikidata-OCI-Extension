window.addEventListener("mouseup", handleSelection)

let word;

function handleSelection() {
    // get the selected text
    word = window.getSelection();
    selectedWord = word.toString().toLowerCase().trim();
}

// receive the word from popup
chrome.runtime.onMessage.addListener(gotOutput);

function gotOutput() {
    let outPut =
        selectedWord && selectedWord.length > 0
            ? selectedWord = document.getElementById("word")
            : "_Text not selected, highlight a word_"

    // send the output to the server
    sendResponse({ hword: outPut })
}
