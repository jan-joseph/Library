let myLibrary = [];

function book(title,author, numOfPages, readStatus = false) {
    this.author = author
    this.title = title
    this.numOfPages = numOfPages
    this.readStatus = readStatus
    this.info = () => `${this.title} by ${this.author}, ${this.numOfPages} pages, ${this.readStatus}`
}

const newBook = new book("A","B", 256, true)

// console.log(newBook.info());