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
    const storedBooks = BookCollection.getStoredBooks();
    const newBook = {
      title: bookTitle,
      author: bookAuthor,
    };
    storedBooks.push(newBook);
    BookCollection.updateStoredBooks(storedBooks);
    BookCollection.displayBooks(storedBooks);
  }

  static removeBook(i) {
    const storedBooks = BookCollection.getStoredBooks();
    storedBooks.splice(i, 1);
    BookCollection.updateStoredBooks(storedBooks);
    BookCollection.displayBooks();
  }

  static createBookListHTML(books) {
    let bookListHTML = '';
    for (let i = 0; i < books.length; i += 1) {
      const { title, author } = books[i];
      bookListHTML += `
        <p>${title}</p>
        <p>${author}</p>
        <button onClick="BookCollection.removeBook(${i})">Remove</button>
        <hr/>
      `;
    }
    return bookListHTML;
  }

  // Displaying the books on the UI from localStorage
  static displayBooks() {
    const listOfBooks = document.querySelector('.container');
    const storedBooks = BookCollection.getStoredBooks();
    const bookListHTML = BookCollection.createBookListHTML(storedBooks);
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