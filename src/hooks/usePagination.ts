import { useState } from 'react';

function usePagination(pageSize: number = 10, pageNumber: number = 1) {
  const [page, setPage] = useState(pageNumber);
  const [pageSizeState, setPageSizeState] = useState(pageSize);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSizeState(newPageSize);
  };

  return {
    page,
    pageSize: pageSizeState,
    setPage: handlePageChange,
    setPageSize: handlePageSizeChange,
  };
}

export default usePagination;
