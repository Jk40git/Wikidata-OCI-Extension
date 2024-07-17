document.getElementById('zoom-in').addEventListener('click', function() 
{
    document.body.style.zoom = parseFloat(document.body.style.zoom || 1) + 0.1;
});

document.getElementById('zoom-out').addEventListener('click', function() 
{
    document.body.style.zoom = parseFloat(document.body.style.zoom || 1) - 0.1;
});

document.getElementById('dark-mode-toggle').addEventListener('click', function() 
{
    document.body.classList.toggle('dark-mode');
});