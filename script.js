// Copy Button Function
function copyCode(button) {
    const code = button.previousElementSibling.innerText;
    navigator.clipboard.writeText(code).then(() => {
        button.innerText = 'Copied!';
        button.style.background = '#3fb950';
        setTimeout(() => {
            button.innerText = 'Copy';
            button.style.background = '';
        }, 2000);
    });
}

// Search Filter Functionality
document.getElementById('searchInput').addEventListener('keyup', function(e) {
    const term = e.target.value.toLowerCase();
    const articles = document.querySelectorAll('.card');

    articles.forEach(article => {
        const text = article.innerText.toLowerCase();
        if (text.includes(term)) {
            article.style.display = 'block';
        } else {
            article.style.display = 'none';
        }
    });
});
