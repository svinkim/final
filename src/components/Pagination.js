import React from 'react';

const Pagination = ({ currentPage, totalItems, onPrevious, onNext }) => {
  const totalPages = Math.ceil(totalItems / 10); // 페이지당 10개의 항목 기준으로 총 페이지 수 계산

  return (
    <div className="pagination">
      {/* 이전 버튼 */}
      <button
        onClick={onPrevious}
        disabled={currentPage === 1} // 현재 페이지가 1이면 비활성화
        className="pagination-button"
      >
        이전
      </button>

      {/* 현재 페이지 / 총 페이지 수 */}
      <span className="pagination-info">
        {currentPage} / {totalPages} 페이지
      </span>

      {/* 다음 버튼 */}
      <button
        onClick={onNext}
        disabled={currentPage === totalPages} // 현재 페이지가 마지막 페이지면 비활성화
        className="pagination-button"
      >
        다음
      </button>
    </div>
  );
};

export default Pagination;
