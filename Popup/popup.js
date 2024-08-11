/** @format */
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
})

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
function updateWordSection(text) {
  const wordSection = document.getElementById('word');
  if (wordSection) {
    wordSection.textContent = text;
    fetchEntities(text)
      .then((data) => {
        displayResults(data.search); // Call function to display results
      })
      .catch((error) => {
        console.error('Error displaying results:', error);
      });
  }
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

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message) => {
  if (message.text) {
    updateWordSection(message.text);
  }
});

// Copy selected text to clipboard
document.getElementById('copy-button').addEventListener('click', () => {
  const wordSection = document.getElementById('word');
  if (wordSection) {
    navigator.clipboard
      .writeText(wordSection.textContent)
      .then(() => alert('Copied to clipboard!'))
      .catch((err) => console.error('Failed to copy text: ', err));
  }
});
