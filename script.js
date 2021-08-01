const Library = ( () => {
    let myLibrary;

    const addBookBtn = document.getElementById('add-book')
    const formModal = document.getElementById('modal')
    const overlay = document.getElementById('overlay')
    const submitBtn = document.getElementById('submit-btn')

    const addBookForm = document.getElementById('addBookForm')
    const libraryGrid = document.getElementById('library')

    const getLocal = () => {
        const books = JSON.parse(localStorage.getItem('library'))
        if (books) {
            myLibrary = books;
          } else {
            myLibrary = []
          }
    };

    const saveLocal = () => {
        localStorage.setItem('library', JSON.stringify(myLibrary))
    };

    const showBookForm = () => {
        formModal.classList.add('active');
        overlay.classList.add('active');
    };
    const hideBookForm = () => {
        formModal.classList.remove('active');
        overlay.classList.remove('active');
    };
    
    const createNewBookObject = () => {
        return {
            title:document.getElementById('book-name').value,
            author:document.getElementById('author-name').value,
            numOfPages:document.getElementById('page-number').value,
            readStatus:document.getElementById('readStatus').checked
        }
    }
    const removeBook = (e) => {
        const title = e.target.parentNode.firstChild.innerHTML.replaceAll('"', '')
        myLibrary = myLibrary.filter(a => (a.title !== title));
        saveLocal();
        libraryGenerate();
    };
    
    const toggleReadStatus = (e) => {
        const title = e.target.parentNode.firstChild.innerHTML.replaceAll('"', '')
        myLibrary.forEach(a => {
            if(a.title === title){
                a.readStatus = !a.readStatus;
            }       
        });
        saveLocal();
        libraryGenerate();
    };
    const createBookCard = (book) => {
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
    
        removeBtn.addEventListener('click',removeBook);
        toggleBtn.addEventListener('click',toggleReadStatus);
    
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
    
    
    const libraryGenerate = () => {
        while(library.firstChild){
            library.firstChild.remove();
        }
        for(let i=0 ; i < myLibrary.length ; i++){
            library.append(createBookCard(myLibrary[i]));
        }
        saveLocal();
    };
    
    const formSubmit = (e) => {
        myLibrary.push(createNewBookObject());
        libraryGenerate();
        hideBookForm();
        addBookForm.reset();
    };

    // Event Listerners
    addBookBtn.addEventListener('click', showBookForm);
    overlay.addEventListener('click', hideBookForm);
    submitBtn.addEventListener('click', formSubmit);

    return {
        getLocal,
        libraryGenerate
    };
})();


Library.getLocal();
Library.libraryGenerate();
