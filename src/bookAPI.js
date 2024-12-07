var isPopupOpen = false;
var currentPage = 1;
var itemsPerPage = 5;
var totalItems = 0;

function searchBooks(page) {
    var searchInput = $('#searchInput').val();
    page = page || 1; // 기본값: 1

    $.ajax({
        method: 'GET',
        url: 'https://dapi.kakao.com/v3/search/book',
        data: { query: searchInput, page: page },
        headers: { Authorization: "KakaoAK 09ea48f07b6d7bc2916a315b30610aeb" }
    })
        .done(function (response) {
            var books = response.documents;
            totalItems = books.length;

            var searchResults = $('#searchResults');
            searchResults.empty();

            if (totalItems === 0) {
                searchResults.append('<p>검색 결과가 없습니다.</p>');
                $('#paginationContainer').hide();
            } else {
                var start = (page - 1) * itemsPerPage;
                var end = start + itemsPerPage;
                var displayedBooks = books.slice(start, end);

                for (var i = 0; i < displayedBooks.length; i++) {
                    var book = displayedBooks[i];
                    var title = book.title;
                    var thumbnail = book.thumbnail;
                    var url = book.url;
                    var authors = book.authors;
                    var publisher = book.publisher;
                    var translators = book.translators;
                    var datetime = book.datetime;
                    var contents = book.contents;
                    var sale_price = book.sale_price;

                    var resultHtml = '<div class="book-item">';
                    resultHtml += '<img src="' + thumbnail + '" onclick="showDetails(\'' + title + '\', \'' + authors + '\', \'' + publisher + '\', \'' + translators + '\', \'' + datetime + '\', \'' + contents + '\', \'' + sale_price + '\', \'' + url + '\')"/>';
                    resultHtml += '</div>';

                    searchResults.append(resultHtml);
                }

                currentPage = page;
                updatePaginationButtons();
                $('#searchResults').show();
                $('#paginationContainer').show();
            }
        })
        .fail(function (error) {
            console.error('책 검색에 실패했습니다:', error);
        });
}

function formatDate(date) {
    var year = date.substr(0, 4);
    var month = date.substr(5, 2);
    var day = date.substr(8, 2);
    return year + '-' + month + '-' + day;
}

function showDetails(title, authors, publisher, translators, datetime, contents, sale_price, url) {
    var popupContent = $('#popupContent');
    popupContent.empty();

    var formattedDate = formatDate(datetime);

    var details = '<p><b>제목:</b> ' + title + '</p>';
    details += '<p><b>저자:</b> ' + authors + '</p>';
    details += '<p><b>출판사:</b> ' + publisher + '</p>';
    details += '<p><b>번역자:</b> ' + translators + '</p>';
    details += '<p><b>출간일:</b> ' + formattedDate + '</p>';
    details += '<div><b>내용:</b> ' + contents + '</div>';
    details += '<p><b>판매 가격:</b> ' + sale_price + '원</p>';
    details += '<button onclick="window.open(\'' + url + '\')">추가 정보</button>';

    popupContent.html(details);

    var popupContainer = $('#popupContainer');
    popupContainer.fadeIn();
    isPopupOpen = true;
}

function updatePaginationButtons() {
    var prevButton = $('#prevButton');
    var nextButton = $('#nextButton');

    prevButton.prop('disabled', currentPage === 1);
    nextButton.prop('disabled', currentPage === Math.ceil(totalItems / itemsPerPage));
}

function showPreviousPage() {
    searchBooks(currentPage - 1);
}

function showNextPage() {
    searchBooks(currentPage + 1);
}

$(document).on('click', function (event) {
    var popupContainer = $('#popupContainer');
    if (!isPopupOpen && !$(event.target).closest('#popupContainer').length) {
        popupContainer.fadeOut();
    }
    isPopupOpen = false;
});

function handleSearch(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        searchBooks();
    }
}

// Display quote on initial page load
$(document).ready(function () {
    $('.quote').show();
});