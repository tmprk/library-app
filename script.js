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

isbn.addEventListener('change', fetchCover);
bookName.addEventListener('input', validate);

submitButton.onclick = function () {
    if (bname.value && pages.value) {
        console.log('all validated')
        console.log(bookName.value, pages.value, didRead.value);

        // insert row here
        // let newRow = table.insertRow(-1);
        // Insert a cell in the row at index 0
        // let newCell = newRow.insertCell(0);
        // Append a text node to the cell
        // let newText = document.createTextNode('New bottom row');
        // newCell.appendChild(newText);
        closeModal();
    } else {
        console.log('not validated')
    }
};