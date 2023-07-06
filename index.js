class thisBook {
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
    const storedBooks = thisBook.getStoredBooks();
    const newBook = {
      title: bookTitle,
      author: bookAuthor,
    };
    storedBooks.push(newBook);
    thisBook.updateStoredBooks(storedBooks);
    thisBook.displayBooks(storedBooks);
  }

  static removeBook(i) {
    const storedBooks = thisBook.getStoredBooks();
    storedBooks.splice(i, 1);
    thisBook.updateStoredBooks(storedBooks);
    thisBook.displayBooks();
  }

  static createBookListHTML(books) {
    let bookListHTML = '';
    for (let i = 0; i < books.length; i += 1) {
      const { title, author } = books[i];
      bookListHTML += `
      <div class= "booklist">
      <p>"${title}" by "${author}"</p>
      <button onClick="thisBook.removeBook(${i})">Remove</button>
      </div>
      `;
    }
    return bookListHTML;
  }

  // Displaying the books on the UI from localStorage
  static displayBooks() {
    const listOfBooks = document.querySelector('.container');
    const storedBooks = thisBook.getStoredBooks();
    const bookListHTML = thisBook.createBookListHTML(storedBooks);
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
  thisBook.addNewBook(title.value, author.value);
});

thisBook.displayBooks();

const date = new Date();
document.getElementById('time').innerHTML = date;

// Single page App implementation
const pages = document.querySelectorAll('.nav-link');
const booklist = document.querySelector('.book-section');
const formSection = document.querySelector('.form-section');
const contactSection = document.querySelector('.contact-container');
const removeForm = document.querySelector('.kform');
const heading = document.querySelector('.heading');

// Show the form section by default
formSection.classList.add('active');
booklist.classList.add('non-active');
contactSection.classList.add('non-active');
removeForm.classList.add('non-active');

pages.forEach((page) => {
  page.addEventListener('click', (e) => {
    booklist.classList.remove('active');
    formSection.classList.remove('active');
    contactSection.classList.remove('active');
    removeForm.classList.remove('active');

    if (e.target.classList.contains('booklist-2')) {
      booklist.classList.add('active');
      formSection.classList.remove('active');
      removeForm.classList.add('non-active');
    } else if (e.target.classList.contains('form-section')) {
      formSection.classList.add('active');
      booklist.classList.add('non-active');
      contactSection.classList.add('non-active');
      removeForm.classList.add('active');
      heading.classList.add('non-active');
    } else if (e.target.classList.contains('contact-section')) {
      contactSection.classList.add('active');
      booklist.classList.add('non-active');
      formSection.classList.add('non-active');
      removeForm.classList.add('non-active');
      heading.classList.add('non-active');
    }
  });
});