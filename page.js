window.addEventListener("mouseup", handleSelection)

let word;

function handleSelection() {
    // get the selected text
    word = window.getSelection();
    selectedWord = word.toString().toLowerCase().trim();
    console.log("worked")
}

// receive the word from popup
chrome.runtime.onMessage.addListener(gotOutput);

const data = function gotOutput() {
    let outPut =
        selectedWord && selectedWord.length > 0
            ? selectedWord = document.getElementById("word")
            : "_Text not selected, highlight a word_"

    // send the output to the server
    sendResponse({ hword: outPut })
    console.log("worked")
    return outPut

}

// fetchEntities(data())
//     // fetchEntities('Cat', 'en')
//     .then(data => console.log(data))
//     .catch(error => console.error(error));