document.addEventListener('DOMContentLoaded', (event) => {
    let urlParams = new URLSearchParams(window.location.search);
    let searchParam = urlParams.get('q');

    if (searchParam != null) {
        let bookData = search(searchParam);
        console.log(bookData);
        if (Object.keys(bookData).length === 0) {
            clearContainer();
            bookData.then((data) => updateCard(data));
        } else {
            console.log('book not found!');
        }
    }
});

async function search(name) {
    let url = `https://www.googleapis.com/books/v1/volumes?q=${name}&fields=items(id,volumeInfo/title)&maxResults=12`;
    try {
        let response = await fetch(url);
        let data = await response.json();
        if (Object.keys(data.items).length > 0) {
            return data;
        } else {
            return null;
        }
    } catch (error) {
        console.log('book not found!');
    }
}

function updateCard(book) {
    for (let i = 0; i < book.items.length; i++) {
        createCard(book.items[i]);
    }

    // button set up
    document.querySelectorAll('.book-card').forEach(box => {
        const button = box.querySelector('.book-button');
        button.addEventListener('click', () => {
            window.location.href = "book-page.html?id=" + encodeURIComponent(box.id);
        });
    });
}

function createCard(book) {
    let bookId = book.id;

    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.id = bookId;

    const bookButton = document.createElement('div');
    bookButton.classList.add('book-button');

    const bookCoverWrapper = document.createElement('div');
    bookCoverWrapper.classList.add('book-cover-wrapper');

    const img = document.createElement('img');
    img.src = `https://books.google.com/books/content?id=${bookId}&printsec=frontcover&img=1&zoom=2&edge=curl&source=gbs_api`;
    bookCoverWrapper.appendChild(img);

    const bookNameWrapper = document.createElement('div');
    bookNameWrapper.classList.add('book-name-wrapper');

    const h3 = document.createElement('h3');
    h3.textContent = book.volumeInfo.title;
    bookNameWrapper.appendChild(h3);

    bookButton.appendChild(bookCoverWrapper);
    bookButton.appendChild(bookNameWrapper);

    bookCard.appendChild(bookButton);

    document.getElementById('book-cards-container').appendChild(bookCard);
}

function clearContainer() {
    const container = document.getElementById('book-cards-container');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}