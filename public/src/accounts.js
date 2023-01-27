
// using find() , const
function findAccountById(accounts, id) {
  const accountLocation = accounts.find(account => account.id === id);
  return accountLocation;
}

// using sort(), let
function sortAccountsByLastName(accounts) {
  let sortedAccounts = accounts.sort((accountA, accountB) => {
    return accountA.name.last.toLowerCase() < accountB.name.last.toLowerCase() ? -1 : 1;
  });
  return sortedAccounts;
}

// using reduce, const, some, reduce
function getTotalNumberOfBorrows(account, books) {
  const accountId = account.id;
  return books.reduce((total, book) => {
    if (book.borrows.some(account => account.id === accountId)){
      return total+1;
    } else {
      return total
    }
  }, 0);
  
}

// using const, let, forEach, filter, map
function getBooksPossessedByAccount(account, books, authors) {
  const accountId = account.id;
  const resultBooks = books.filter(book => book.borrows.some(account => account.id === accountId && account.returned === false));
  const authorIds = resultBooks.map(book => book.authorId);
  const bookAuthors = authors.filter(author => authorIds.includes(author.id));

  return resultBooks.map((book, index) => {return {...book, author: {...bookAuthors[index]}}});
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
