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
    let bookPageCover = document.getElementById('bookPagaCover');
    let bookId = book.id;

    bookPageCover.src = `https://books.google.com/books/content?id=${bookId}&printsec=frontcover&img=1&zoom=4&edge=curl&source=gbs_api`;
}
