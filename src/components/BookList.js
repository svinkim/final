import React from 'react';
import './BookList.css';

const BookList = ({ books, onSelect, onFavorite }) => {
  if (!books || books.length === 0) {
    return <p>검색 결과가 없습니다.</p>;
  }

  return (
    <div className="book-list">
      {books.map((book) => (
        <div key={book.title} className="book-item">
          <img
            src={book.thumbnail}
            alt={book.title}
            onClick={() => onSelect(book)} // 클릭 시 상세 보기 함수 호출
          />
          <h3>{book.title}</h3>
          <p><b>저자:</b> {book.authors && book.authors.join(', ')}</p>
          <p><b>출판사:</b> {book.publisher}</p>
          {/* <p><b>내용:</b> {book.contents}</p> */}
          <button onClick={() => onFavorite(book)}>찜</button> {/* 찜 추가 */}
        </div>
      ))}
    </div>
  );
};

export default BookList;



