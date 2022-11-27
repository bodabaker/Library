class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
}

class Library {
    constructor() {
        this.books = []
    }

    addBook(newBook) {
        if (!this.exists(newBook)) {
            this.books.push(newBook)
        }
    }

    removeBook(index) {
        if (this.books.length !== 1) {
        this.books = this.books.splice(index)
        }
        else {
            this.books.pop()
        }
    }

    exists(book) {
        return this.books.includes(book)
    }

    newest() {
        return this.books[this.books.length - 1]
    }

    lastIndex() {
        return this.books.length - 1
    }
}

const usrLibrary = new Library()

const addBtn = document.getElementById('add')
const booksGrid = document.getElementById('card-grid')
const inputDialog = document.getElementById('input-dialog')
const overlay = document.getElementById('overlay')
const form = document.getElementById('input-form')
const submitBtn = document.getElementById('submit-btn')

addBtn.addEventListener("click", showDialog)
submitBtn.addEventListener("click", addNewBook)
overlay.addEventListener("click", hideDialog)
window.addEventListener("keydown", keyHandler)

function createBookCard() {
        let newBook = usrLibrary.newest()
        // card elements
        const bookCard = document.createElement("div")
        bookCard.className = "card"

        const bookIndex = document.createElement("p")
        bookIndex.textContent = usrLibrary.lastIndex()

        const bookTitle = document.createElement("p")
        bookTitle.textContent = newBook.title
        const bookAuthor = document.createElement("p")
        bookAuthor.textContent = newBook.author
        const bookPages = document.createElement("p")
        bookPages.textContent = newBook.pages
        const readBtn = document.createElement("button")
        readBtn.className = "btn"
        readBtn.addEventListener('click', toggleRead)
        if (newBook.isRead === true) {
            readBtn.classList.add("btn-green")
            readBtn.textContent = "Finished"
        }
        else {
            readBtn.classList.add("btn-red")
            readBtn.textContent = "Not Read"
        }
        const delBtn = document.createElement("button")
        delBtn.addEventListener("click", delBook)
        delBtn.textContent = "Delete"
        delBtn.classList.add("btn", "btn-grey")

        bookCard.appendChild(bookIndex)
        bookCard.appendChild(bookTitle)
        bookCard.appendChild(bookAuthor)
        bookCard.appendChild(bookPages)
        bookCard.appendChild(readBtn)
        bookCard.appendChild(delBtn)
        booksGrid.appendChild(bookCard)
}

function showDialog() {
    inputDialog.classList.add('active')
    overlay.classList.add('active')
}

function hideDialog() {
    form.reset()
    inputDialog.classList.remove('active')
    overlay.classList.remove('active')
}

function keyHandler(k) {
    if (k.key === "Escape") {
        hideDialog()
    }
    else if (k.key === "a") {
        showDialog()
    }
}

function getNewBook() {
    title = document.getElementById('title').value
    author = document.getElementById('author').value
    pages = document.getElementById('pages').value
    isRead = document.getElementById('is-read').checked

    return new Book(title, author, pages, isRead)
}

function addNewBook(e) {
    e.preventDefault()
    usrLibrary.addBook(getNewBook())
    createBookCard()
    hideDialog()
}

function toggleRead(e) {
    const index = e.target.parentNode.firstChild.innerText
    usrLibrary.books[index].isRead = !(usrLibrary.books[index].isRead)
    const isRead = usrLibrary.books[index].isRead
    // console.log(e.target.classList)

    if (isRead) {
        e.target.classList.remove("btn-red")
        e.target.classList.add("btn-green")
        e.target.innerText = "Finished"
    }
    else {
        e.target.classList.remove("btn-green")
        e.target.classList.add("btn-red")
        e.target.innerText = "Not Read"
    }
}

function delBook(e) {
    const index = e.target.parentNode.firstChild.innerText
    e.target.parentNode.remove()

    usrLibrary.removeBook(index)
}