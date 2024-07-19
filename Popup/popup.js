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

