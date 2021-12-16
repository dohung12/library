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
    bookElement.appendChild(item);
  }

  function createReadDetail() {
    let item = document.createElement("p");
    item.classList.add("read");
    if (bookObj["read"]) {
      item.innerText = "Read: " + "read";
    } else {
      item.innerText = "Read: " + "unread";
    }

    bookElement.appendChild(item);
  }

  function addReadToggleBtn(bookElement) {
    let readToggleBtn = document.createElement("button");
    readToggleBtn.setAttribute("class", "btn read-toggle-btn");

    let icon = document.createElement("i");
    icon.setAttribute("class", "fas fa-book-open");

    readToggleBtn.appendChild(icon);

    readToggleBtn.addEventListener("click", () => {
      bookObj.read = !bookObj.read;
      bookElement.parentElement.removeChild(bookElement);
      displayBook(bookObj);
    });

    bookElement.appendChild(readToggleBtn);
  }
  function addDelBtn(bookElement) {
    let delBtn = document.createElement("button");
    delBtn.setAttribute("class", "btn del-btn");

    let icon = document.createElement("i");
    icon.setAttribute("class", "fas fa-trash");

    delBtn.appendChild(icon);

    delBtn.addEventListener("click", () => {
      const index = bookElement.dataset.id;

      myLibrary.splice(index, 1);
    });

    bookElement.appendChild(delBtn);
  }
  let bookElement = document.createElement("div");
  bookElement.classList.add("book");
  bookElement.setAttribute("data-id", myLibrary.indexOf(bookObj));

  for (let i of ["title", "author", "pages"]) {
    createBookDetail(i);
  }

  createReadDetail();
  addReadToggleBtn(bookElement);

  addDelBtn(bookElement);

  bookContainer.appendChild(bookElement);
}
