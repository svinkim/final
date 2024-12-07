import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookDetailPage = () => {
  const { id } = useParams(); // URL 파라미터로 받은 책 ID
  const navigate = useNavigate(); // 페이지 이동을 위한 hook
  const [book, setBook] = useState(null); // 책 데이터 상태
  const [memoText, setMemoText] = useState(''); // 메모 상태

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`https://67281907270bd0b975545491.mockapi.io/Book/${id}`);
        setBook(response.data);
        setMemoText(response.data.memo || ''); // 메모 값 초기화
      } catch (error) {
        console.error('책 정보를 가져오는데 실패했습니다.', error);
      }
    };

    fetchBook();
  }, [id]);

  const handleUpdateMemo = async () => {
    try {
      await axios.put(`https://67281907270bd0b975545491.mockapi.io/Book/${id}`, { memo: memoText });
      alert('메모가 저장되었습니다.');
    } catch (error) {
      console.error('메모 저장 중 오류 발생:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://67281907270bd0b975545491.mockapi.io/Book/${id}`);
      alert('책이 삭제되었습니다.');
      navigate('/mypage'); // 마이페이지로 이동
    } catch (error) {
      console.error('책 삭제 중 오류 발생:', error);
    }
  };

  const handleClose = () => {
    console.log('Navigating to /mypage');
    navigate('/mypage');
  };
  

  if (!book) return <p>로딩 중...</p>; // 책 데이터가 없으면 로딩 메시지 표시

  return (
    <div className="book-detail-page">
      <div className="book-detail-container">
        <div className="book-image">
          <img src={book.thumbnail} alt={book.title} />
        </div>
        <div className="book-info">
          <h2>{book.title}</h2>
          <p><b>저자:</b> {book.authors && book.authors.join(', ')}</p>
          <p><b>출판사:</b> {book.publisher}</p>
          <p><b>출판일:</b> {book.datetime}</p>
          <p><b>내용:</b> {book.contents}</p>
          <p><b>판매 가격:</b> {book.sale_price ? `${book.sale_price}원` : '정보 없음'}</p>
        </div>
      </div>
      <textarea
        value={memoText}
        onChange={(e) => setMemoText(e.target.value)}
        placeholder="독후감을 입력하세요"
      />
      <div className="button-container">
        <button onClick={handleUpdateMemo}>메모 저장</button>
        <button onClick={handleDelete}>삭제</button>
        <button onClick={handleClose}>닫기</button> {/* 닫기 버튼 수정 */}
      </div>
    </div>
  );
};

export default BookDetailPage;
