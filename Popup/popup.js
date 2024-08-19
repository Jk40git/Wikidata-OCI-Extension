// get the currently active tab in the current window
// and then invoke the callback function gotTabs.
let query = { active: true, currentWindow: true };
chrome.tabs.query(query, readTabs);

// function to check current url and eliminate offline urls.
function safeUrl(url) {
  return url.startsWith("https://") || url.startsWith("http://");
}

// callback function
function readTabs(tabs) {
  // prevent offline urls to run the extension by throwing error.
  if (!safeUrl(tabs[0].url)) {
    document.getElementById("error").innerHTML = "Oops!!!";
    document.getElementById("word").innerHTML = "Unsupported Page.";
    document.getElementById("popup").innerHTML = "Please move to a url supported page!"
    return;
  }
  // Interaction with the zoom button
  document.getElementById('zoom-in').addEventListener('click', function () {
    document.body.style.zoom = parseFloat(document.body.style.zoom || 1) + 0.1;
  });

  document.getElementById('zoom-out').addEventListener('click', function () {
    document.body.style.zoom = parseFloat(document.body.style.zoom || 1) - 0.1;
  });

  // Dark mode interaction
  var content = document.getElementsByTagName('body')[0];
  var darkMode = document.getElementById('dark-mode-toggle');
  darkMode.addEventListener('click', () => {
    darkMode.classList.toggle('active');
    content.classList.toggle('night');

    if (content.classList.contains("night")) {
      theme = "DARK"
    } else {
      theme = "LIGHT"
    }

    localStorage.setItem('PageTheme', JSON.stringify(theme))

  })

  let getTheme = JSON.parse(localStorage.getItem("PageTheme"))

  if (getTheme === "DARK") {
    document.body.classList = 'night'
    darkMode.classList.toggle('active')
  }


  let msg = {
    txt: "hello from popup",
  };

  // send message to the content script
  chrome.tabs.sendMessage(tabs[0].id, msg, function (response) {
    if (!response) {
      document.getElementById("popup").innerHTML =
        "Refresh the page and try again!";
    } else if (response.swor === "_TextNotSelected_") {
      document.getElementById("word").innerHTML = "Welcome!";
      document.getElementById("popup").innerHTML =
        "Please select a word and click on the extension.";
    } else {
      let swo = response.swor;
      swo = swo.replace(/[^a-zA-Z ]/g, "");
      fetchEntities(swo)
    }
    async function fetchEntities(searchTerm, language = 'en') {
      const endpoint = 'https://www.wikidata.org/w/api.php';

      const params = new URLSearchParams({
        action: 'wbsearchentities',
        format: 'json',
        search: searchTerm,
        language: language,
        limit: 7,
        origin: '*',
      });

      try {
        const response = await fetch(`${endpoint}?${params}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        return data;
      } catch (error) {
        console.error('Error fetching entities:', error);
        throw error;
      }
    }

    // Function to update the word section with selected text
    function updateWordSection(swo) {
      const wordSection = document.getElementById('word');
      if (wordSection) {
        wordSection.textContent = swo;
        fetchEntities(swo)
          .then((data) => {
            displayResults(data.search); // Call function to display results
          })
          .catch((error) => {
            console.error('Error displaying results:', error);
          });
      }
    
    // Function to display search results
    function displayResults(data) {
      console.log('data', data);
      const resultList = document.getElementById('result').querySelector('ol');
      resultList.innerHTML = ''; // Clear previous results

      if (data && data) {
        data.forEach((search) => {
          const listItem = document.createElement('li');
          console.log('search.label', search);
          // listItem.textContent = search.label; // Adjust based on actual structure
          listItem.innerHTML = `<div style="align-items:flex-start; justify-content: start;" >
      <h5>
      ${search.label}
      </h5>
        <p>
      ${search.description}
      </p>
      </div>`;
          resultList.appendChild(listItem);
        });
      } else {
        const noResultsItem = document.createElement('li');
        noResultsItem.textContent = 'No results found';
        resultList.appendChild(noResultsItem);
      }
    }
  }
  });
}



// Listen for messages from the content script
// chrome.runtime.onMessage.addListener((message) => {
//   if (message.text) {
//     updateWordSection(message.text);
//   }
// });

// Copy selected text to clipboard
// document.getElementById('copy-button').addEventListener('click', () => {
//   const wordSection = document.getElementById('word');
//   if (wordSection) {
//     navigator.clipboard
//       .writeText(wordSection.textContent)
//       .then(() => alert('Copied to clipboard!'))
//       .catch((err) => console.error('Failed to copy text: ', err));
//   }
// });
