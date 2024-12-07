import React, { useState } from 'react';
import './BookDetails.css';
import axios from 'axios';

const BookDetails = ({ book, onClose, isMyPage = false }) => {
  const [memo, setMemo] = useState(book.memo || '');

  const handleSaveMemo = async () => {
    try {
      await axios.put(`https://67281907270bd0b975545491.mockapi.io/Book/${book.id}`, {
        memo,
      });
      alert('독후감이 저장되었습니다.');
    } catch (error) {
      console.error('독후감 저장 중 오류 발생:', error);
      alert('독후감 저장에 실패했습니다.');
    }
  };

  if (!book) return null;

  return (
    <div className="book-details-container">
      <div className="book-details">
        <img src={book.thumbnail} alt={book.title} />
        <h2>{book.title}</h2>
        <p><b>저자:</b> {book.authors && book.authors.join(', ')}</p>
        <p><b>출판사:</b> {book.publisher}</p>
        <p><b>출판일:</b> {book.datetime.slice(0, 10)}</p>
        <p><b>내용:</b> {book.contents}</p>
        <p><b>판매 가격:</b> {book.sale_price ? `${book.sale_price}원` : '정보 없음'}</p>

        {isMyPage && ( // 마이페이지에서만 메모 UI 표시
          <>
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="독후감을 입력하세요."
            ></textarea>
          </>
        )}

        <div className="button-container">
          {isMyPage && <button onClick={handleSaveMemo}>저장</button>}
          <button onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;


