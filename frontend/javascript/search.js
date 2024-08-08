document.getElementById('input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        let inputValue = event.target.value;
        window.location.href = "index.html?q=" + encodeURIComponent(inputValue);
    }
});