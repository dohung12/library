/* eslint-disable no-use-before-define */
import './style.css'
import Book from './book-class'

const bookContainer = document.querySelector('.book-container')
const newBookBtn = document.querySelector('.new-btn')
const newBookForm = document.querySelector('.new-book-form')
const submitBtn = document.querySelector('.submit-btn')

const myLibrary = []

// EVENT LISTENER
newBookBtn.addEventListener('click', toggleFormDisplay)

submitBtn.addEventListener('click', (e) => {
  e.preventDefault()

  const detailsArr = []
  ;['title', 'author', 'pages'].forEach((element) => {
    const category = document.querySelector(`input[name=${element}]`)
    detailsArr.push(category.value)
    category.value = ''
  })

  const haveRead = document.querySelector('input[name="read"]:checked')
  detailsArr.push(haveRead.value)
  document.querySelector('#read-stt-1').checked = true
  if (detailsArr.every((element) => element !== '')) {
    addBookToLibrary(detailsArr[0], detailsArr[1], detailsArr[2], detailsArr[3])
  }
})
// FUNCTIONS

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read)
  myLibrary.push(book)
  displayBook(book)
}

function displayLibrary() {
  bookContainer.innerHTML = ''
  myLibrary.forEach((book) => displayBook(book))
}

function displayBook(bookObj) {
  function createBookDetail(category) {
    // create <p class="category"> CATEGORY: "XXXXX" </p>
    const item = document.createElement('p')
    item.classList.add(`${category}`)
    item.innerHTML = `<strong>${category.toUpperCase()}</strong>: ${
      bookObj[category]
    }`
    bookElement.appendChild(item)
  }

  function createReadDetail() {
    // create <p class="read"> READ: "XXXXX" </p>
    const item = document.createElement('p')
    item.classList.add('read')

    if (bookObj.haveRead === 'true') {
      item.innerHTML = '<strong>READ</strong>: read'
    } else {
      item.innerHTML = '<strong>READ</strong>: unread'
    }

    bookElement.appendChild(item)
  }

  function createReadToggleBtn(bookElement) {
    const readToggleBtn = document.createElement('button')
    readToggleBtn.setAttribute('class', 'btn read-toggle-btn')

    const icon = document.createElement('i')
    icon.setAttribute('class', 'fas fa-book-open')

    readToggleBtn.appendChild(icon)

    readToggleBtn.addEventListener('click', () => {
      bookObj.toggleReadStatus()
      const item = bookElement.querySelector('.read')
      if (bookObj.haveRead) {
        item.innerHTML = '<strong>READ</strong>: read'
      } else {
        item.innerHTML = '<strong>READ</strong>: unread'
      }
    })

    btnContainer.appendChild(readToggleBtn)
  }

  function createDelBtn(bookElement) {
    // create del button for every book
    const delBtn = document.createElement('button')
    delBtn.setAttribute('class', 'btn del-btn')

    const icon = document.createElement('i')
    icon.setAttribute('class', 'fas fa-trash')

    delBtn.appendChild(icon)

    delBtn.addEventListener('click', () => {
      const index = bookElement.dataset.id
      myLibrary.splice(index, 1)
      displayLibrary()
    })

    btnContainer.appendChild(delBtn)
  }

  // create the book's details
  let bookElement = document.createElement('div')
  bookElement.classList.add('book')
  bookElement.setAttribute('data-id', myLibrary.indexOf(bookObj))
  ;['title', 'author', 'pages'].forEach((element) => {
    createBookDetail(element)
  })

  // create buttons
  const btnContainer = document.createElement('div')
  btnContainer.classList.add('btn-container')

  createReadDetail()
  createReadToggleBtn(bookElement)

  createDelBtn(bookElement)
  bookElement.appendChild(btnContainer)

  bookContainer.appendChild(bookElement)
}

function toggleFormDisplay() {
  newBookForm.classList.toggle('hide-form')
}
