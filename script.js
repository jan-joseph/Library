const Library = ( () => {

    let myLibrary;

    const addBookBtn = document.getElementById('add-book')
    const formModal = document.getElementById('modal')
    const overlay = document.getElementById('overlay')
    const submitBtn = document.getElementById('submit-btn')

    const addBookForm = document.getElementById('addBookForm')
    const libraryGrid = document.getElementById('library')

    // Intialize the Libray Array from Local Storage values.
    const intializeLibrary = (books) => {
        myLibrary = books;
    }

    // Handling the Modal Windows
    const _showBookForm = () => {
        formModal.classList.add('active');
        overlay.classList.add('active');
    };
    const _hideBookForm = () => {
        formModal.classList.remove('active');
        overlay.classList.remove('active');
    };
    
    // To Return a new Book Object taken from the Modal Form
    const _createNewBookObject = () => {
        return {
            title:document.getElementById('book-name').value,
            author:document.getElementById('author-name').value,
            numOfPages:document.getElementById('page-number').value,
            readStatus:document.getElementById('readStatus').checked
        }
    }

    // Remove the Book from Library Grid
    const _removeBook = (e) => {
        const title = e.target.parentNode.firstChild.innerHTML.replaceAll('"', '')
        myLibrary = myLibrary.filter(a => (a.title !== title));
        Storage.saveLocal();
        libraryGenerate();
    };
    
    // Toggle the Read Status of the Book in Grid
    const _toggleReadStatus = (e) => {
        const title = e.target.parentNode.firstChild.innerHTML.replaceAll('"', '')
        myLibrary.forEach(a => {
            if(a.title === title){
                a.readStatus = !a.readStatus;
            }       
        });
        Storage.saveLocal(myLibrary);
        libraryGenerate();
    };

    // Create a Book Card HTML Element and return it
    const _createBookCard = (book) => {
        const bookCard = document.createElement('div');
        const titleElement = document.createElement('h3');
        const authorElement = document.createElement('p');
        const pageNumberElement = document.createElement('p');
        const readStatusElement = document.createElement('p');
        const toggleBtn = document.createElement('button');
        const removeBtn = document.createElement('button');
    
        bookCard.classList.add('book-card','d-flex','flex-column','justify-content-center','shadow','p-3','corner-1')
        titleElement.classList.add('fs-3','fw-bold','text-uppercase');
        authorElement.classList.add('fs-4');
        pageNumberElement.classList.add('fs-6');
        readStatusElement.classList.add('fs-6');
        toggleBtn.classList.add('btn','bgc-toggle','tc-black','border-dark');
        removeBtn.classList.add('btn','bgc-caution','tc-white','mt-2','border-dark');
    
        removeBtn.addEventListener('click',_removeBook);
        toggleBtn.addEventListener('click',_toggleReadStatus);
    
        titleElement.textContent = book.title;
        authorElement.textContent = book.author;
        pageNumberElement.textContent = `${book.numOfPages} pages`;
        readStatusElement.textContent = book.readStatus? 'Have Read': "Haven't Read";
        toggleBtn.textContent = "Toggle Status";
        removeBtn.textContent = "Remove Book";
    
        bookCard.appendChild(titleElement);
        bookCard.appendChild(authorElement);
        bookCard.appendChild(pageNumberElement);
        bookCard.appendChild(readStatusElement);
        bookCard.appendChild(toggleBtn);
        bookCard.appendChild(removeBtn);
        return bookCard;
    };
    
    // Generate the library grid from Library Array
    const libraryGenerate = () => {
        while(libraryGrid.firstChild){
            libraryGrid.firstChild.remove();
        }
        for(let i=0 ; i < myLibrary.length ; i++){
            libraryGrid.append(_createBookCard(myLibrary[i]));
        }
        Storage.saveLocal(myLibrary);
    };
    
    const _formSubmit = (e) => {
        myLibrary.push(_createNewBookObject());
        libraryGenerate();
        _hideBookForm();
        addBookForm.reset();
    };

    // Event Listerners
    addBookBtn.addEventListener('click', _showBookForm);
    overlay.addEventListener('click', _hideBookForm);
    submitBtn.addEventListener('click', _formSubmit);

    return {
        intializeLibrary,
        libraryGenerate
    };
})();

const Storage = (() => {
    const getLocal = () => {
        const books = JSON.parse(localStorage.getItem('library'))
        if (books) {
            return books;
          } else {
            return [];
          }
    };

    const saveLocal = (books) => {
        localStorage.setItem('library', JSON.stringify(books))
    };
    
    return {
        getLocal,
        saveLocal
    };
})();

Library.intializeLibrary(Storage.getLocal());
Library.libraryGenerate();
