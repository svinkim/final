import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyPage = ({ onSelect }) => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('https://67281907270bd0b975545491.mockapi.io/Book');
        setFavorites(response.data);
      } catch (error) {
        console.error('찜 목록을 가져오는 데 실패했습니다:', error);
      }
    };

    fetchFavorites();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://67281907270bd0b975545491.mockapi.io/Book/${id}`);
      setFavorites(favorites.filter((book) => book.id !== id));
    } catch (error) {
      console.error('삭제 중 오류 발생:', error);
    }
  };

  const handleDetails = (book) => {
    onSelect(book); // App.js에서 selectedBook 설정
    navigate('/mypage');
  };

  return (
    <div className="my-page">
      <h2>찜한 목록</h2>
      <div className="book-list">
        {favorites.map((book) => (
          <div key={book.id} className="book-item">
            <img src={book.thumbnail} alt={book.title} />
            <h3>{book.title}</h3>
            <p><b>저자:</b> {book.authors && book.authors.join(', ')}</p>
            <p><b>출판사:</b> {book.publisher}</p>
            <button onClick={() => handleDetails(book)}>자세히 보기</button>
            <button onClick={() => handleDelete(book.id)}>삭제</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPage;
