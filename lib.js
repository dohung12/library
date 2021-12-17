const bookContainer = document.querySelector(".book-container");
const newBookBtn = document.querySelector(".new-btn");
const newBookForm = document.querySelector(".new-book-form");
const submitBtn = document.querySelector(".submit-btn");

let myLibrary = [];

// EVENT LISTENER
newBookBtn.addEventListener("click", toggleFormDisplay);

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const bookTitle = document.querySelector('input[name="title"]');
  const bookAuthor = document.querySelector('input[name="author"]');
  const bookPages = document.querySelector('input[name="pages"]');
  const bookReadStt = document.querySelector('input[name="read"]:checked');

  addBookToLibrary(
    bookTitle.value,
    bookAuthor.value,
    bookPages.value,
    bookReadStt.value
  );
  displayLibrary();
  //remove text in input box after press submit, back to placeholder value
  bookTitle.value = "";
  bookAuthor.value = "";
  bookPages.value = "";
  document.querySelector("#read-stt-1").checked = true;
});
// FUNCTIONS
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
    // create <p class="category"> CATEGORY: "XXXXX" </p>
    let item = document.createElement("p");
    item.classList.add(`${category}`);
    item.innerText = category.toUpperCase() + ": " + bookObj[category];
    bookElement.appendChild(item);
  }

  function createReadDetail() {
    // create <p class="read"> READ: "XXXXX" </p>
    let item = document.createElement("p");
    item.classList.add("read");
    if (bookObj["read"]) {
      item.innerText = "READ: " + "read";
    } else {
      item.innerText = "READ: " + "unread";
    }

    bookElement.appendChild(item);
  }

  function createReadToggleBtn(bookElement) {
    let readToggleBtn = document.createElement("button");
    readToggleBtn.setAttribute("class", "btn read-toggle-btn");

    let icon = document.createElement("i");
    icon.setAttribute("class", "fas fa-book-open");

    readToggleBtn.appendChild(icon);

    readToggleBtn.addEventListener("click", () => {
      bookObj.read = !bookObj.read;
      displayLibrary();
    });

    btnContainer.appendChild(readToggleBtn);
  }

  function createDelBtn(bookElement) {
    // create del button for every book
    let delBtn = document.createElement("button");
    delBtn.setAttribute("class", "btn del-btn");

    let icon = document.createElement("i");
    icon.setAttribute("class", "fas fa-trash");

    delBtn.appendChild(icon);

    delBtn.addEventListener("click", () => {
      const index = bookElement.dataset.id;
      myLibrary.splice(index, 1);
      displayLibrary();
    });

    btnContainer.appendChild(delBtn);
  }

  // create the book's details
  let bookElement = document.createElement("div");
  bookElement.classList.add("book");
  bookElement.setAttribute("data-id", myLibrary.indexOf(bookObj));

  for (let i of ["title", "author", "pages"]) {
    createBookDetail(i);
  }

  // create buttons
  btnContainer = document.createElement("div");
  btnContainer.classList.add("btn-container");

  createReadDetail();
  createReadToggleBtn(bookElement);
  createDelBtn(bookElement);
  bookElement.appendChild(btnContainer);

  bookContainer.appendChild(bookElement);
}

function toggleFormDisplay(e) {
  newBookForm.classList.toggle("hide-form");
}
