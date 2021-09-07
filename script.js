class storage {
    constructor() { }
    getLocal(){
        const books = JSON.parse(localStorage.getItem('library'))
        if (books) {
            return books;
          } else {
            return [];
          }
    }

    saveLocal(books){
        localStorage.setItem('library', JSON.stringify(books))
    }
}

class library extends storage {

    constructor() {
        super();
        this.myLibrary = super.getLocal();
        this.formModal = document.getElementById('modal');
        this.overlay = document.getElementById('overlay');
    }
    // Handling the Modal Windows
    _showBookForm(){
        this.formModal.classList.add('active');
        this.overlay.classList.add('active');
    }
    _hideBookForm (){
        this.overlay.classList.remove('active');
        this.formModal.classList.remove('active');
    }  
    
    // To Return a new Book Object taken from the Modal Form
    _createNewBookObject (bookName,authorName,pageNumber,readStatus){
        return {
            title:bookName.value,
            author:authorName.value,
            numOfPages:pageNumber.value,
            readStatus:readStatus.checked
        }
    }

    // Remove the Book from Library Grid
    _removeBook(e){
        const title = e.target.parentNode.firstChild.innerHTML.replaceAll('"', '')
        this.myLibrary = this.myLibrary.filter(a => (a.title !== title));
        super.saveLocal(this.myLibrary);
        this.libraryGenerate();
    }
    
    // Toggle the Read Status of the Book in Grid
    _toggleReadStatus (e){
        const title = e.target.parentNode.firstChild.innerHTML.replaceAll('"', '')

        this.myLibrary.forEach(a => {
            if(a.title === title){
                a.readStatus = !a.readStatus;
            }       
        });
        // Storage.saveLocal(myLibrary);
        super.saveLocal(this.myLibrary);
        this.libraryGenerate();
    };

    // Create a Book Card HTML Element and return it
    _createBookCard(book) {
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
    
        removeBtn.addEventListener('click',(e) => this._removeBook(e));
        toggleBtn.addEventListener('click',(e) => this._toggleReadStatus(e));
    
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
    libraryGenerate() {
        const addBookBtn = document.getElementById('add-book');
        const submitBtn = document.getElementById('submit-btn');
        const libraryGrid = document.getElementById('library');
        
        // Event Listerners
        addBookBtn.addEventListener('click', (e) => this._showBookForm(e));
        this.overlay.addEventListener('click', () => this._hideBookForm());
        submitBtn.addEventListener('click',() => this._formSubmit());

        while(libraryGrid.firstChild){
            libraryGrid.firstChild.remove();
        }
        for(let i=0 ; i < this.myLibrary.length ; i++){
            libraryGrid.append(this._createBookCard(this.myLibrary[i]));
        }
        // Storage.saveLocal(myLibrary);
        super.saveLocal(this.myLibrary);
    }
    
    _formSubmit () {
        const addBookForm = document.getElementById('addBookForm');
        const bookName = document.getElementById('book-name')
        const authorName = document.getElementById('author-name')
        const pageNumber = document.getElementById('page-number')
        const readStatus = document.getElementById('readStatus')

        if ( authorName.validity.valid && 
            bookName.validity.valid && 
            pageNumber.validity.valid){
            this.myLibrary.push(this._createNewBookObject(bookName,authorName,pageNumber,readStatus));
            this.libraryGenerate();
            this._hideBookForm();
            addBookForm.reset();
        }
    }

}

// Library.intializeLibrary(Storage.getLocal());
// Library.libraryGenerate();

const libraryClass = new library();
libraryClass.libraryGenerate();