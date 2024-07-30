document.getElementById('inputField').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        let inputValue = event.target.value;
        let bookData = search(inputValue);

        if (bookData != null) {
            bookData.then((data) => updateCard(data));
        } else {
            console.log('book not found!');
        }
    }
});

async function search(name) {
    let url = `https://www.googleapis.com/books/v1/volumes?q=${name}&maxResults=1`;
    try {
        let response = await fetch(url);
        let data = await response.json();
        if (data.items && data.items.length > 0) {
            return data;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

function updateCard(book) {
    let bookTitle = document.getElementById('title1');
    let bookCover = document.getElementById('img1');
    let bookId = book.items[0].id;

    bookTitle.innerHTML = book.items[0].volumeInfo.title;

    bookCover.src = `https://books.google.com/books/content?id=${bookId}&printsec=frontcover&img=1&zoom=4&edge=curl&source=gbs_api`;
}

function createCard() {
    const box = document.createElement('div');
    box.classList.add('box');

    const imgDiv = document.createElement('div');
    imgDiv.classList.add('img');

    const img = document.createElement('img');
    img.src = 'imgs/coverTest2.png';
    img.id = 'img1';
    imgDiv.appendChild(img);

    const textDiv = document.createElement('div');
    textDiv.classList.add('text');
    textDiv.id = 'txt1';

    const h3 = document.createElement('h3');
    
}