// import Book from './Book.js';

const table = document.getElementById('book-list');
const modal = document.getElementById('modal');

// Get the button that opens the modal
const addBtn = document.getElementById("add");

// Get the cancel that closes the modal
const cancel = document.getElementById("cancel");

const cover = document.getElementById('cover');
const isbn = document.getElementById('isbn');
const bookName = document.getElementById('bname');
const pages = document.getElementById('pages');
const didRead = document.getElementById('read')
const errorMsg = document.getElementById('error');
const submitButton = document.getElementById('submit');

const columnHeaders = ['cover', 'title', 'pages', 'read']
var books = JSON.parse(localStorage.getItem("books") || "[]");

function setBooks() {
    if (books.length === 0) {
        books.push(new Book('https://books.google.com/books/content?id=bL3VlijouIwC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api', '1400079985', 'War and Peace', 1273, false))
        books.push(new Book('https://books.google.com/books/content?id=mWHcDAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api', '9780486280615', 'The Adventures of Huckleberry Finn', 220, false))
        books.push(new Book('https://books.google.com/books/content?id=sI_UG8lLey0C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api', '0142437239', 'Don Quixote', 1072, false))
        localStorage.setItem('books', JSON.stringify(books))
        console.log('no books in localStorage, is empty');
    } else {
        console.log(`${books.length} book(s) present. not empty`);
        console.log(books);
    }
    books.forEach(function callback(element, index) {
        addRow(element);
    })
}

function addRow(element) {
    let tr = table.insertRow(-1);
    tr.classList.add('row-no-header');
    for (let i = 0; i < columnHeaders.length; i++) {
        let td = tr.insertCell();
        if (i == 0 || i == 3) {
            td.classList.add('fitwidth');
        }

        if (i == 1) {
            td.classList.add('titleCell');
        }

        if (columnHeaders[i] == 'cover') {
            var element1 = document.createElement("img");
            element1.src = element.url;
            // element1.src = 'http://placehold.jp/100x160.png'
            td.appendChild(element1);
        } else {
            if (columnHeaders[i] == 'read') {
                var toggleButton = document.createElement("button");
                var haveRead = element[columnHeaders[i]];
                toggleButton.textContent = (haveRead) ? 'read' : 'not read';
                toggleButton.style.backgroundColor = (haveRead) ? 'rgba(48, 205, 85, 0.523)' : '#de4c5985'

                toggleButton.onclick = function (e) {
                    let rowIndex = e.target.closest('tr').rowIndex;
                    books[rowIndex - 1].read = !books[rowIndex - 1].read;
                    toggleButton.textContent = (books[rowIndex - 1].read) ? 'read' : 'not read';
                    toggleButton.style.backgroundColor = (books[rowIndex - 1].read) ? 'rgba(48, 205, 85, 0.523)' : '#de4c5985'
                    localStorage.setItem('books', JSON.stringify(books))
                }

                td.appendChild(toggleButton)
            } else {
                td.innerHTML = element[columnHeaders[i]];
            }
        }
    }
}


function closeModal() {
    modal.style.display = "none";
    document.body.classList.remove('modal-open');
}

// When the user clicks on the button, open the modal
addBtn.onclick = () => {
    isbn.value = bookName.value = '';
    modal.style.display = "flex";
    document.body.classList.add('modal-open');
}

// When the user clicks on cancel, close the modal
cancel.onclick = () => {
    closeModal()
    // document.body.style.overflow = 'auto';
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
    if (event.target == modal) {
        closeModal();
        // document.body.style.overflow = 'auto';
    }
}

function validate(e) {
    if (e.target.value == null || e.target.value == '') {
        errorMsg.style.display = 'block';
    } else {
        errorMsg.style.display = 'none';
    }
}

function fetchData(event) {
    const isbnToTry = event.target.value;
    fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbnToTry}`).then(function (response) {
        // The API call was successful!
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response);
        }
    }).then(function (data) {
        // This is the JSON from our response
        // console.log(data['items'].count)
        // populate fields with fetched data
        const bookData = data['items'][0]['volumeInfo'];
        const smallThumbnailSrc = bookData['imageLinks']['smallThumbnail'];
        
        cover.src = smallThumbnailSrc;
        bookName.value = bookData.title;
        pages.value = bookData.pageCount;
    }).catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err);
    });
}

isbn.addEventListener('change', fetchData);
bookName.addEventListener('input', validate);

submitButton.onclick = function () {
    if (bookName.value && pages.value) {
        console.log('all validated')
        console.log(cover.src, isbn.value, bookName.value, pages.value, didRead.value);
        
        const newBook = new Book(cover.src, isbn.value, bookName.value, Number(pages.value), didRead.value == 'on' ? true : false)
        books.push(newBook);
        addRow(newBook);
        localStorage.setItem('books', JSON.stringify(books))

        console.log(books);
        // Append a text node to the cell
        // let newText = document.createTextNode('New bottom row');
        // newCell.appendChild(newText);
        closeModal();

        window.scrollBy({
            top: table.offsetHeight, // Scroll the the end of the tabele's height
            behavior: 'smooth'
        });
    } else {
        console.log('not validated')
    }
};

setBooks();