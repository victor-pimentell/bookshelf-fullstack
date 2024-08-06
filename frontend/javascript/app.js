document.getElementById('input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        let inputValue = event.target.value;
        let bookData = search(inputValue);

        if (bookData != null) {
            clearContainer();
            bookData.then((data) => updateCard(data));
        } else {
            console.log('book not found!');
        }
    }
});

async function search(name) {
    let url = `https://www.googleapis.com/books/v1/volumes?q=${name}&fields=items(id,volumeInfo/title)&maxResults=10`;
    try {
        let response = await fetch(url);
        let data = await response.json();
        if (Object.keys(data.items).length > 0) {
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
    for (let i = 0; i < book.items.length; i++) {
        createCard(book.items[i]);
    }

    // button set up
    document.querySelectorAll('.box').forEach(box => {
        const button = box.querySelector('button');
        button.addEventListener('click', () => {
            window.location.href = "book-page.html?id=" + encodeURIComponent(box.id);
        });
    });
}

function createCard(book) {
    let bookId = book.id;

    const box = document.createElement('div');
    box.classList.add('box');
    box.id = bookId;

    const imgDiv = document.createElement('div');
    imgDiv.classList.add('img');

    const img = document.createElement('img');
    img.src = `https://books.google.com/books/content?id=${bookId}&printsec=frontcover&img=1&zoom=2&edge=curl&source=gbs_api`;
    imgDiv.appendChild(img);

    const textDiv = document.createElement('div');
    textDiv.classList.add('text');

    const h3 = document.createElement('h3');
    h3.textContent = book.volumeInfo.title;
    textDiv.appendChild(h3);

    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('button');

    const button = document.createElement('button');
    button.textContent = 'READ';
    buttonDiv.appendChild(button);

    box.appendChild(imgDiv);
    box.appendChild(textDiv);
    box.appendChild(buttonDiv);

    document.getElementById('container').appendChild(box);
}

function clearContainer() {
    const container = document.getElementById('container');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}