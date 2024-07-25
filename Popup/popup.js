// Interaction with the zoom button
document.getElementById('zoom-in').addEventListener('click', function() 
{
    document.body.style.zoom = parseFloat(document.body.style.zoom || 1) + 0.1;
});

document.getElementById('zoom-out').addEventListener('click', function() 
{
    document.body.style.zoom = parseFloat(document.body.style.zoom || 1) - 0.1;
});

// Dark mode interaction
var content = document.getElementsByTagName('body')[0];
var darkMode = document.getElementById('dark-mode-toggle');
darkMode.addEventListener('click',()=>{
    darkMode.classList.toggle('active');
    content.classList.toggle('night');
})

// get the currently active tab in the current window
// and then invoke the callback function readTabs.
// let query = { active: true, currentWindow: true };
// chrome.tabs.query(query, readTabs);