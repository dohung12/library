export default class Book {
  constructor(title, author, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
  }

  toggleReadStatus() {
    this.haveRead = !this.haveRead;
  }

  get info() {
    return `${this.title} by ${this.author}, ${this.pages}, ${this.read}`;
  }
}
