let myLibrary;

const addBookBtn = document.getElementById('add-book')
const formModal = document.getElementById('modal')
const overlay = document.getElementById('overlay')
const submitBtn = document.getElementById('submit-btn')

const library = document.getElementById('library')


const showBookForm = () => {
    formModal.classList.add('active');
    overlay.classList.add('active');
}
const hideBookForm = () => {
    formModal.classList.remove('active');
    overlay.classList.remove('active');
}

function Book(title,author, numOfPages, readStatus = false) {
    this.author = author
    this.title = title
    this.numOfPages = numOfPages
    this.readStatus = readStatus
}

const createNewBookObject = () => {
    return new Book(
        document.getElementById('book-name').value,
        document.getElementById('author-name').value,
        document.getElementById('page-number').value,
        document.getElementById('readStatus').checked
    )
}

const createBookCard = (book) => {
    const bookCard = document.createElement('div');
    const title = document.createElement('h3');
    const author = document.createElement('p');
    const pageNumber = document.createElement('p');
    const read = document.createElement('p');
    const toggleBtn = document.createElement('button');
    const removeBtn = document.createElement('button');

    bookCard.classList.add('book-card','d-flex','flex-column','justify-content-center','shadow','p-3','corner-1')
    title.classList.add('fs-3','fw-bold','text-uppercase');
    author.classList.add('fs-4');
    pageNumber.classList.add('fs-6');
    read.classList.add('fs-6');
    toggleBtn.classList.add('btn','bgc-toggle','tc-black');
    removeBtn.classList.add('btn','bgc-caution','tc-white','mt-2');

    title.textContent = book.title;
    author.textContent = book.author;
    pageNumber.textContent = `${book.numOfPages} pages`;
    read.textContent = book.readStatus? 'Have Read': "Haven't Read";
    toggleBtn.textContent = "Toggle Status";
    removeBtn.textContent = "Remove Book";

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pageNumber);
    bookCard.appendChild(read);
    bookCard.appendChild(toggleBtn);
    bookCard.appendChild(removeBtn);
    return bookCard
}


const addToLibrary = () => {
    while(library.firstChild){
        library.firstChild.remove();
    }
    for(let i=0 ; i < myLibrary.length ; i++){
        library.append(createBookCard(myLibrary[i]));
    }
    saveLocal();
}

const formSubmit = (e) => {
    console.log('success');
    const newBook = createNewBookObject();
    myLibrary.push(newBook);
    addToLibrary();
}

// Local Storage
const saveLocal = () => {
    localStorage.setItem('library', JSON.stringify(myLibrary))
}

const getLocal = () => {
    const books = JSON.parse(localStorage.getItem('library'))
    console.log(books);
    if (books) {
        myLibrary = books;
      } else {
        myLibrary = []
      }
}

Book.prototype.toggleReadStatus = () => {
    this.readStatus = this.readStatus?false:true;
}
function bookToLibrary() {
    
}

function removeBookfromLibrary() {
    
}

getLocal();
addToLibrary();
addBookBtn.addEventListener('click', showBookForm);
overlay.addEventListener('click', hideBookForm);
submitBtn.addEventListener('click', formSubmit);
