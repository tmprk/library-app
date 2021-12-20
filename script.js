var modal = document.getElementById('modal');

// Get the button that opens the modal
var addBtn = document.getElementById("add");

// Get the <span> element that closes the modal
var span = document.getElementById("cancel");

// When the user clicks on the button, open the modal
addBtn.onclick = () => {
    modal.style.display = "flex";
    document.body.classList.add('modal-open');
}

// When the user clicks on cancel, close the modal
span.onclick = () => {
    modal.style.display = "none";
    document.body.classList.remove('modal-open');
    document.body.style.overflow = 'auto';
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
        document.body.classList.remove('modal-open');
        document.body.style.overflow = 'auto';
    }
}