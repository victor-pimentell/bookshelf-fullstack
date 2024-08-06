document.addEventListener('DOMContentLoaded', (event) => {
    let bookId = obterParametro('id');
    
    let bookData = searchBookPage(bookId);

    if (bookData != null) {
        bookData.then((data) => updateBookPage(data));
    } else {
        console.log('book not found!');
    }
});

function obterParametro(parametro) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parametro);
}

async function searchBookPage(bookId) {
    let url = `https://www.googleapis.com/books/v1/volumes/${bookId}`;
    try {
        let response = await fetch(url);
        let data = await response.json();
        if (Object.keys(data).length > 0) {
            return data;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

function updateBookPage(book) {

    let bookPageCover = document.getElementById('bookPageCover');
    let bookId = book.id;
    bookPageCover.src = `https://books.google.com/books/content?id=${bookId}&printsec=frontcover&img=1&zoom=4&edge=curl&source=gbs_api`;

    console.log(book);

    let title = document.getElementById('title');
    title.textContent = book.volumeInfo.title;

    let description = document.getElementById('description');
    description.textContent = removeHTMLTags(book.volumeInfo.description);

    let author = document.getElementById('author');
    let authorList = book.volumeInfo.authors;
    for (let i = 0; i < authorList.length; i++) {
        let li = document.createElement('li');
        li.textContent = authorList[i];
        author.appendChild(li);
    }

    let publisher = document.getElementById('publisher');
    publisher.textContent = book.volumeInfo.publisher;removeHTMLTags(book.volumeInfo.publisher);

    let publisherDate = document.getElementById('publishedDate');
    publisherDate.textContent = book.volumeInfo.publishedDate;

    let pages = document.getElementById('pageCount');
    pages.textContent = book.volumeInfo.pageCount;

    let geres = document.getElementById('genres');
    let genresList = book.volumeInfo.categories;
    for (let i = 0; i < genresList.length; i++) {
        let li = document.createElement('li');
        li.textContent = genresList[i];
        geres.appendChild(li);
    }
}

function removeHTMLTags(htmlString) {
    let doc = new DOMParser().parseFromString(htmlString, 'text/html');
    return doc.body.textContent || "";
}