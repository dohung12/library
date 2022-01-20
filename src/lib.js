/* eslint-disable no-use-before-define */
import './style.css'
import Book from './book-class'
import { displayBook } from './displayController'

const newBookBtn = document.querySelector('.new-btn')
const newBookForm = document.querySelector('.new-book-form')
const submitBtn = document.querySelector('.submit-btn')

const myLibrary = []

// EVENT LISTENER
newBookBtn.addEventListener('click', toggleFormDisplay)

submitBtn.addEventListener('click', submitHandle)
// FUNCTIONS

function submitHandle(e) {
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
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read)
  myLibrary.push(book)
  displayBook(book)
}

function toggleFormDisplay() {
  newBookForm.classList.toggle('hide-form')
}
