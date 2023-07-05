class BookCollection {
  // Make sure if the local storage in empty than add an empty array
  static getStoredBooks() {
    if (localStorage.getItem('Added books') === null) {
      localStorage.setItem('Added books', JSON.stringify([]));
    }
    return JSON.parse(localStorage.getItem('Added books'));
  }

  // Store the books data into the local storage
  static updateStoredBooks(books) {
    localStorage.setItem('Added books', JSON.stringify(books));
  }

  static addNewBook(bookTitle, bookAuthor) {
    const storedBooks = this.getStoredBooks();
    const newBook = {
      title: bookTitle,
      author: bookAuthor,
    };
    storedBooks.push(newBook);
    this.updateStoredBooks(storedBooks);
    this.displayBooks(storedBooks);
  }

  static removeBook(i) {
    const storedBooks = this.getStoredBooks();
    storedBooks.splice(i, 1);
    this.updateStoredBooks(storedBooks);
    this.displayBooks();
  }

  static createBookListHTML(books) {
    let bookListHTML = '';
    for (let i = 0; i < books.length; i += 1) {
      const { title, author } = books[i];
      bookListHTML += `
      <div class= "booklist">
      <p>"${title}" by "${author}"</p>
      <button onClick="BookCollection.removeBook(${i})">Remove</button>
      </div>
      `;
    }
    return bookListHTML;
  }

  // Displaying the books on the UI from localStorage
  static displayBooks() {
    const listOfBooks = document.querySelector('.container');
    const storedBooks = this.getStoredBooks();
    const bookListHTML = this.createBookListHTML(storedBooks);
    listOfBooks.innerHTML = `
        <ul class="book-ul">${bookListHTML}</ul>
      `;
  }
}

// Get values from input fields
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  const title = document.querySelector('.title');
  const author = document.querySelector('.author');
  e.preventDefault();
  BookCollection.addNewBook(title.value, author.value);
});

BookCollection.displayBooks();