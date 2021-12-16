const bookContainer = document.querySelector(".book-container");
let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages}, ${this.read}`;
  };
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

function displayLibrary() {
  bookContainer.innerHTML = "";
  for (let book of myLibrary) {
    displayBook(book);
  }
}

function displayBook(bookObj) {
  function createBookDetail(category) {
    let item = document.createElement("p");
    item.classList.add(`${category}`);
    item.innerText =
      category[0].toUpperCase() + category.slice(1) + ": " + bookObj[category];
    book.appendChild(item);
  }

  let book = document.createElement("div");
  book.classList.add("book");
  book.setAttribute("data-id", myLibrary.indexOf(bookObj));

  for (let i of ["title", "author", "pages", "read"]) {
    createBookDetail(i);
  }

  addDelBtn(book);

  bookContainer.appendChild(book);
}

function addDelBtn(item) {
  let delBtn = document.createElement("button");
  delBtn.setAttribute("class", "btn del-btn");

  let icon = document.createElement("i");
  icon.setAttribute("class", "fas fa-trash");

  delBtn.appendChild(icon);

  delBtn.addEventListener("click", () => {
    const index = item.dataset.id;
    item.parentElement.removeChild(item);
    myLibrary.splice(index, 1);
  });

  item.appendChild(delBtn);
}
