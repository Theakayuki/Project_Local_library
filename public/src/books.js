function findAuthorById(authors, id) {
  const author = authors.find(author => author.id === id);
  return author;
}

function findBookById(books, id) {
  return books.find(book => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const checkedOutBooks = books.filter(book => book.borrows.some(status => status.returned === false));
  const checkedInBooks = books.filter(book => book.borrows.every(status => status.returned === true));
  return [checkedOutBooks, checkedInBooks];
}

function getBorrowersForBook(book, accounts) {
  return accounts
  .filter(account => book.borrows.some(status => status.id === account.id))
  .map(account => {
    const status = book.borrows.find(status => status.id === account.id).returned;
    return {returned: status, ...account}
  });
}



module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
