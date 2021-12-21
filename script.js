import Book from './Book.js';

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

if (books.length === 0) {
    // books.push(new Book('http://books.google.com/books/content?id=bL3VlijouIwC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api', '1400079985', 'War and Peace', 1273, false))
// books.push(new Book('http://books.google.com/books/content?id=mWHcDAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api', '9780486280615', 'The Adventures of Huckleberry Finn', 220, false))
// books.push(new Book('http://books.google.com/books/content?id=sI_UG8lLey0C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api', '0142437239', 'Don Quixote', 1072, false))
    console.log('empty');
} else {
    console.log(books);
    books.forEach(function callback(element, index) {
        let tr = table.insertRow(-1);
        tr.classList.add('row-no-header');
        for (let i = 0; i < columnHeaders.length; i++) {
            let td = tr.insertCell();
            
            if (i == 0) {
                td.classList.add('fitwidth');
            }

            if (columnHeaders[i] == 'cover') {
                var element1 = document.createElement("img");
                element1.src = element.url;
                td.appendChild(element1);
            } else {
                td.innerHTML = element[columnHeaders[i]];
            }
        }
    })
}
// localStorage.setItem('books', JSON.stringify(books))

function closeModal() {
    modal.style.display = "none";
    document.body.classList.remove('modal-open');
}

// When the user clicks on the button, open the modal
addBtn.onclick = () => {
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

function fetchCover(event) {
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
        const bookData = data['items'][0]['volumeInfo']
        const thumbnail = bookData['imageLinks']['smallThumbnail']

        bookName.value = bookData.title
        cover.src = thumbnail
    }).catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err);
    });
}

// isbn.addEventListener('change', fetchCover);
bookName.addEventListener('input', validate);

submitButton.onclick = function () {
    if (bname.value && pages.value) {
        console.log('all validated')
        console.log(bookName.value, pages.value, didRead.value);

        // insert row here
        const tr = table.insertRow(-1);
        // Insert a cell in the row at index 0
        for (let i = 0; i < columnHeaders.length; i++) {
            let td = tr.insertCell(0);
            td.innerHTML = `Cell ${i}`;
        }
        // Append a text node to the cell
        // let newText = document.createTextNode('New bottom row');
        // newCell.appendChild(newText);
        closeModal();
    } else {
        console.log('not validated')
    }
};