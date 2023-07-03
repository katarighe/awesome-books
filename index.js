// Make sure if the local storage in empty than add an empty array
if (localStorage.getItem('Added Books') == null) {
  localStorage.setItem('Added Books', JSON.stringify([]));
}

// Store the books data into the local storage
const storeData = JSON.parse(localStorage.getItem('Added Books'));

function updateData() {
  localStorage.setItem('Added Books', JSON.stringify(storeData));
}

// Retriving values from input fields
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  const title = document.querySelector('.title');
  const author = document.querySelector('.author');
  e.preventDefault();
  // eslint-disable-next-line no-use-before-define
  addNewdata(title.value, author.value);
});

function createBooks(arr) {
  let books = '';
  for (let i = 0; i < arr.length; i += 1) {
    books += ` 
          <p>${arr[i].title}</p>
          <p>${arr[i].author}</p>
          <button onclick ="removeBook(${i})">Remove</button>
          <hr/>
          `;
  }
  return books;
}

// Displaying the books on the UI from localStorage
function displayBooks() {
  const listedBooks = document.querySelector('.container');
  listedBooks.innerHTML = `
      <ul class = "book-ul"/>
      ${createBooks(storeData)}</ul>`;
}

// Adding new books to the local storage
function addNewdata(bookTitle, bookAuthor) {
  const Book = {
    title: bookTitle,
    author: bookAuthor,
  };
  storeData.push(Book);
  updateData();
  displayBooks();
}

// Removing data from the localStorage
// eslint-disable-next-line no-unused-vars
function removeBook(i) {
  storeData.splice(i, 1);
  updateData();
  displayBooks();
}

window.onload = displayBooks;