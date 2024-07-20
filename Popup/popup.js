// get the currently active tab in the current window
// and then invoke the callback function readTabs.
let query = { active: true, currentWindow: true };
chrome.tabs.query(query, readTabs);

// Interaction with the zoom button
document.getElementById('zoom-in').addEventListener('click', function() 
{
    document.body.style.zoom = parseFloat(document.body.style.zoom || 1) + 0.1;
});

document.getElementById('zoom-out').addEventListener('click', function() 
{
    document.body.style.zoom = parseFloat(document.body.style.zoom || 1) - 0.1;
});

document.addEventListener('DOMContentLoaded', (event) => {
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    //Function to initialize dark mode based on localStorage
    const initializeDarkMode = () => {
        if(localStorage.getItem('dark-mode') === 'enabled') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    };

    //Function to toggle dark mode
    const toggleDarkMode = () => {
        document.body.classList.toggle('dark-mode');
        if(document.body.classList.contains('dark-mode')) {
            localStorage.setItem('dark-mode', 'enabled');
        } else {
            localStorage.removeItem('dark-mode');
        }
    };

    //Initialize dark mode based on localStorage
    initializeDarkMode();

    //Add event listener for dark mode toggle button
    darkModeToggle.addEventListener('click', toggleDarkMode);
});
