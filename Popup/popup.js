document.addEventListener('DOMContentLoaded', function () {
  let query = { active: true, currentWindow: true };
  chrome.tabs.query(query, readTabs);

  let currentPage = 1;
  const itemsPerPage = 3; // Number of items per page

  // Safe URL checker
  function safeUrl(url) {
    return url.startsWith("https://") || url.startsWith("http://");
  }

  // Main function to read active tab information
  function readTabs(tabs) {
    if (tabs.length === 0) {
      showError("Oops!!!", "No active tab.", "Please open a supported page.");
      return;
    }

    const tab = tabs[0];
    if (!safeUrl(tab.url)) {
      showError("Oops!!!", "Unsupported Page.", "Please move to a supported page!");
      return;
    }

    setupZoomButtons();
    setupDarkMode();
    sendMessageToTab(tab.id, { txt: "hello from popup" });
  }

  // Show error message in the popup
  function showError(errorTitle, word, popupMessage) {
    document.getElementById("error").innerHTML = errorTitle;
    document.getElementById("word").innerHTML = word;
    document.getElementById("popup").innerHTML = popupMessage;
  }

  // Setup zoom in and zoom out buttons
  function setupZoomButtons() {
    document.getElementById('zoom-in').addEventListener('click', function () {
      adjustZoom(0.1);
    });

    document.getElementById('zoom-out').addEventListener('click', function () {
      adjustZoom(-0.1);
    });
  }

  // Adjust zoom level
  function adjustZoom(zoomChange) {
    document.body.style.zoom = parseFloat(document.body.style.zoom || 1) + zoomChange;
    this.blur();
  }

  // Setup dark mode toggle
  function setupDarkMode() {
    const content = document.body;
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    // Add event listener to toggle dark mode
    darkModeToggle.addEventListener('click', toggleDarkMode);

    // Check and apply the saved theme from localStorage
    const savedTheme = localStorage.getItem("PageTheme");
    if (savedTheme === "DARK") {
      content.classList.add('night');
      darkModeToggle.classList.add('active');
    }
  }

  // Toggle dark mode
  function toggleDarkMode() {
    const content = document.body;
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    // Toggle the night class on body
    content.classList.toggle('night');
    darkModeToggle.classList.toggle('active');

    // Save the theme preference in localStorage
    const theme = content.classList.contains("night") ? "DARK" : "LIGHT";
    localStorage.setItem('PageTheme', theme);
  }

  // Send message to the active tab
  function sendMessageToTab(tabId, message) {
    if (!tabId) {
      console.error("Invalid tab ID");
      showError("", "", "Unable to communicate with the tab. Please try again.");
      return;
    }

    chrome.tabs.sendMessage(tabId, message, function (response) {
      if (chrome.runtime.lastError) {
        console.error("Could not send message to tab:", chrome.runtime.lastError.message);
        showError("", "", "Failed to send message. Refresh the page and try again.");
        return;
      }
      handleTabResponse(response);
    });
  }

  // Handle response from the content script
  function handleTabResponse(response) {
    if (!response) {
      showError("", "", "Refresh the page and try again!");
      return;
    }

    if (response.swor === "_TextNotSelected_") {
      showError("", "Welcome!", "Please select a word and click on the extension.");
    } else {
      const word = cleanText(response.swor);

      //Check if the user is online
      if (!navigator.onLine) {
        showError("Offline Mode", "", "Please connect to the internet to use this feature.");
        return;
      }


      updateWordSection(word);
    }
  }

  // Clean the text received from content script
  function cleanText(text) {
    return text.replace(/(\w+),(\W+)/g, "");
  }

  // Update the word section in the UI
  function updateWordSection(word) {
    const wordSection = document.getElementById('word');
    wordSection.textContent = word;

    fetchEntities(word)
      .then((data) => {
        setupPagination(data.search);
        displayResults(data.search, currentPage);
      })
      .catch((error) => console.error('Error displaying results:', error));
  }

  // Fetch entities from Wikidata API
  async function fetchEntities(searchTerm, language = 'en') {
    const endpoint = 'https://www.wikidata.org/w/api.php';
    const params = new URLSearchParams({
      action: 'wbsearchentities',
      format: 'json',
      search: searchTerm,
      language: language,
      uselang: 'user',
      limit: 7,
      origin: '*',
    });

    const response = await fetch(`${endpoint}?${params}`);
    if (!response.ok) throw new Error('Network response was not ok');

    return response.json();
  }

  // Setup pagination controls
  function setupPagination(data) {
    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const pagination = document.querySelector('.pagination');
    pagination.innerHTML = ''; // Clear existing pagination

    // Previous button
    const prevButton = createPageItem('&laquo;', currentPage > 1 ? currentPage - 1 : 1);
    pagination.appendChild(prevButton);

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      const pageItem = createPageItem(i, i);
      if (i === currentPage) {
        pageItem.classList.add('active');
      }
      pagination.appendChild(pageItem);
    }

    // Next button
    const nextButton = createPageItem('&raquo;', currentPage < totalPages ? currentPage + 1 : totalPages);
    pagination.appendChild(nextButton);

    // Event listeners for pagination
    pagination.querySelectorAll('.page-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const page = parseInt(item.dataset.page, 10);
        currentPage = page;
        displayResults(data, page);
        setupPagination(data);
      });
    });
  }

  // Create pagination item
  function createPageItem(label, page) {
    const li = document.createElement('li');
    li.className = 'page-item';
    li.dataset.page = page;
    li.innerHTML = `<a class="page-link" href="#">${label}</a>`;
    return li;
  }

  // Display results in the popup based on the current page
  function displayResults(data, page) {
    const resultList = document.getElementById('result').querySelector('ul');
    resultList.innerHTML = ''; // Clear previous results

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedData = data.slice(start, end);

    if (paginatedData.length > 0) {
      paginatedData.forEach((item) => {
        const listItem = document.createElement('li');
        listItem.innerHTML =
          // <div style="align-items: flex-start; justify-content: start;">
          //   <h5></h5>
          //   <p></p>
          // </div>;
          `<ul class="list-group list-group-light">
            <li class="list-group-item">
              <h6 id="popup"> ${item.label} </h6>
              <p class="text-muted mb-0"> ${item.description}  </p>
            </li>
          </ul>`
        resultList.appendChild(listItem);
      });
    } else {
      const noResultsItem = document.createElement('li');
      noResultsItem.textContent = 'No results found';
      resultList.appendChild(noResultsItem);
    }
  }

  //Remove focus from language selection after change
  document.querySelector('.lang select').addEventListener('change', function () {
    this.blur();
  });


  // document.getElementById('lang').addEventListener('change', handleSelect)
  // function handleSelect(ev) { ()=> {

  //   let select = ev.target;
  //   console.log(ev)
  //   fetchEntities(searchTerm, ev)

  // }}

  //Remove focus from any button after clicking
  document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function () {
      this.blur();
    });
  });

  // Fetch entities from Wikipedia API
  async function fetchUrl(searchTerm) {
    const endpoint = 'https://en.wikipedia.org/w/api.php';
      searchTerm = word

    try {
       const response = await fetch(endpoint, params={'q': searchTerm});
       const data = await response.json();
       console.log(data)   
       return data.url;   
    } catch (error) {
       console.error('Error fetching URL, No such item on wikipedia:', error);
    }
  }
  // Function to set the href of the link
  async function setLinkHref() {
    const url = await fetchUrl();
    if(url){
      document.getElementById('word').href = url;
    }
    
  }

  document.addEventListener('DOMContentLoaded',setLinkHref);

});
