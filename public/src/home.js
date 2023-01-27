function getTotalBooksCount(books) {
  return books.reduce(totalHelper, 0);
}

function getTotalAccountsCount(accounts) {
  return accounts.reduce(totalHelper, 0);
}

function getBooksBorrowedCount(books) {
  return books
  .filter(book => book.borrows.some(isCheckedOut))
  .reduce(totalHelper, 0);
}

function getMostCommonGenres(books) {
  return books.reduce((genres, book) => {
    const genre = genres.find(genre => genre.name === book.genre);
    if (genre) {
      genre.count++;
    } else {
      genres.push({name: book.genre, count: 1});
    }
    return genres;
  }
  , []).sort((genreA, genreB) => genreB.count - genreA.count).slice(0, 5);
}

function getMostPopularBooks(books) {
  return books.map(book => {
    return {name: book.title, count: book.borrows.length}
  }).sort((bookA, bookB) => bookB.count - bookA.count).slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  return authors.map(author => {
    const authorBooks = books.filter(book => book.authorId === author.id);
    const authorBookBorrows = authorBooks.reduce((total, book) => total + book.borrows.length, 0);
    return {name: `${author.name.first} ${author.name.last}`, count: authorBookBorrows};
  }).sort((authorA, authorB) => authorB.count - authorA.count).slice(0, 5);
}

function totalHelper(total, item) {
  // check if item exists
  if (item){
    // add 1 to total if so
    return total + 1;
  }
  // if not just return total unchanged
  return total;
}


const isCheckedOut = status => status.returned === false;

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
