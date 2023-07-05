class BookCollection {
  constructor() {
    this.books = this.getStoredBooks();
  }

  // Make sure if the local storage is empty, then add an empty array
  getStoredBooks = () => {
    if (localStorage.getItem('Added books') === null) {
      localStorage.setItem('Added books', JSON.stringify([]));
    }
    return JSON.parse(localStorage.getItem('Added books'));
  }

  // Store the books data into the local storage
  updateStoredBooks = (books) => {
    localStorage.setItem('Added books', JSON.stringify(books));
  }

  addNewBook(bookTitle, bookAuthor) {
    const newBook = {
      title: bookTitle,
      author: bookAuthor,
    };
    this.books.push(newBook);
    this.updateStoredBooks(this.books);
    this.displayBooks();
  }

  removeBook(i) {
    this.books.splice(i, 1);
    this.updateStoredBooks(this.books);
    this.displayBooks();
  }

  createBookListHTML = (books) => {
    let bookListHTML = '';
    for (let i = 0; i < books.length; i += 1) {
      const { title, author } = books[i];
      bookListHTML += `
        <div class="booklist">
          <p>"${title}" by "${author}"</p>
          <button onClick="bookCollection.removeBook(${i})">Remove</button>
        </div>
      `;
    }
    return bookListHTML;
  };

  // Displaying the books on the UI from localStorage
  displayBooks() {
    const listOfBooks = document.querySelector('.container');
    const bookListHTML = this.createBookListHTML(this.books);
    listOfBooks.innerHTML = `
      <ul class="book-ul">${bookListHTML}</ul>
    `;
  }
}

// Get values from input fields
const form = document.querySelector('form');
const bookCollection = new BookCollection();

form.addEventListener('submit', (e) => {
  const title = document.querySelector('.title');
  const author = document.querySelector('.author');
  e.preventDefault();
  bookCollection.addNewBook(title.value, author.value);
});

bookCollection.displayBooks();