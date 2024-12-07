import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import Pagination from './components/Pagination';
import MyPage from './components/MyPage';
import BookDetails from './components/BookDetails';
import axios from 'axios';

const App = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedBook, setSelectedBook] = useState(null);
  const [filters, setFilters] = useState({}); // 검색 필터 저장
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태

  const searchBooks = async (filters, page = 1) => {
    const API_URL = `https://dapi.kakao.com/v3/search/book`;
    const API_KEY = 'KakaoAK d33a75edb2afb34d953f74cfe93dd89c';

    try {
      setIsLoading(true); // 로딩 상태 시작
      const query = filters.query || '책'; // 기본 검색어
      const params = {
        query, // 검색어
        page,
        size: 24, // 페이지당 12개
      };

      console.log('API 호출 Params:', params); // 디버깅용 로그

      const response = await axios.get(API_URL, {
        headers: { Authorization: API_KEY },
        params,
      });

      console.log('응답 데이터:', response.data.documents);

      let filteredBooks = response.data.documents;

      // 클라이언트 측 필터링
      if (filters.dateFrom || filters.dateTo) {
        filteredBooks = filteredBooks.filter((book) => {
          const bookDate = new Date(book.datetime).getTime();
          const dateFrom = filters.dateFrom ? new Date(filters.dateFrom).getTime() : null;
          const dateTo = filters.dateTo ? new Date(filters.dateTo).getTime() : null;
          return (!dateFrom || bookDate >= dateFrom) && (!dateTo || bookDate <= dateTo);
        });
      }

      if (filters.priceMin || filters.priceMax) {
        filteredBooks = filteredBooks.filter((book) => {
          const price = book.sale_price || 0;
          const priceMin = filters.priceMin || 0;
          const priceMax = filters.priceMax || Infinity;
          return price >= priceMin && price <= priceMax;
        });
      }

      setBooks(filteredBooks); // 현재 페이지의 필터링된 데이터 저장
      setTotalItems(response.data.meta.total_count); // 전체 아이템 수 저장
      setCurrentPage(page); // 현재 페이지 업데이트
    } catch (error) {
      console.error('책 검색에 실패했습니다:', error);
    } finally {
      setIsLoading(false); // 로딩 상태 종료
    }
  };

  const handleSelectBook = (book) => {
    setSelectedBook(book);
  };

  const handleFavorite = async (book) => {
    try {
      const response = await axios.post('https://67281907270bd0b975545491.mockapi.io/Book', {
        title: book.title,
        authors: book.authors,
        publisher: book.publisher,
        datetime: book.datetime,
        thumbnail: book.thumbnail,
        contents: book.contents,
        sale_price: book.sale_price,
        memo: '', // 초기 메모는 빈 값
      });

      if (response.status === 201) {
        alert(`${book.title}이(가) 찜 목록에 추가되었습니다.`);
      } else {
        alert('찜 추가에 실패했습니다.');
      }
    } catch (error) {
      console.error('찜 추가 중 오류 발생:', error);
      alert('찜 추가 중 오류가 발생했습니다.');
    }
  };

  const handleCloseDetails = () => {
    setSelectedBook(null);
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <nav>
          <Link to="/">홈</Link> | <Link to="/mypage">마이페이지</Link>
        </nav>
        <Routes>
          {/* 홈페이지 */}
          <Route
            path="/"
            element={
              <>
                <SearchBar
                  onSearch={(newFilters) => {
                    setFilters(newFilters);
                    searchBooks(newFilters);
                  }}
                />
                {isLoading ? (
                  <p>로딩 중...</p>
                ) : selectedBook ? (
                  <BookDetails
                    book={selectedBook}
                    onClose={handleCloseDetails}
                    isMyPage={false} // 메모 UI 비활성화
                  />
                ) : (
                  <>
                    <BookList
                      books={books}
                      onSelect={handleSelectBook}
                      onFavorite={handleFavorite}
                    />
                    <Pagination
                      currentPage={currentPage}
                      totalItems={totalItems}
                      onPrevious={() => searchBooks(filters, currentPage - 1)}
                      onNext={() => searchBooks(filters, currentPage + 1)}
                    />
                  </>
                )}
              </>
            }
          />
          {/* 마이페이지 */}
          <Route
            path="/mypage"
            element={
              <>
                {selectedBook ? (
                  <BookDetails
                    book={selectedBook}
                    onClose={() => setSelectedBook(null)}
                    isMyPage={true} // 메모 UI 활성화
                  />
                ) : (
                  <MyPage
                    onSelect={(book) => setSelectedBook(book)}
                  />
                )}
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
