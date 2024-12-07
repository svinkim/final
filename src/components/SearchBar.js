import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [publisher, setPublisher] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const handleSearch = () => {
    onSearch({
      query,
      publisher,
      priceMin: priceMin || null,
      priceMax: priceMax || null,
      dateFrom: dateFrom || null,
      dateTo: dateTo || null,
    });
  };

  return (
    <div className="search-container">
      
      <input
        type="number"
        placeholder="가격 하한"
        value={priceMin}
        onChange={(e) => setPriceMin(e.target.value)}
      />
      ~
      <input
        type="number"
        placeholder="가격 상한"
        value={priceMax}
        onChange={(e) => setPriceMax(e.target.value)}
      />
      |
      <input
        type="date"
        value={dateFrom}
        onChange={(e) => setDateFrom(e.target.value)}
      />
      ~ 
      <input
        type="date"
        value={dateTo}
        onChange={(e) => setDateTo(e.target.value)}
      />
      |
      {/* <input
        type="text"
        placeholder="출판사"
        value={publisher}
        onChange={(e) => setPublisher(e.target.value)}
      /> */}

      <input
        type="text"
        placeholder="통합 검색 (제목, 출판사, 저자 ...)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>검색</button>
    </div>
  );
};

export default SearchBar;
