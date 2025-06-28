import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

interface IProps {
  defaultLimit?: number;
}

const usePaginationWrapper = ({ defaultLimit = 10 }: IProps) => {
  const [pageable, setPageable] = useState<any>({
    total_elements: 0,
    total_pages: 0,
    number_of_elements: 0,
  });
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(defaultLimit);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [numberOfElements, setNumberOfElements] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>('');
  const [debouncedSearchText] = useDebounce(searchText, 300);

  const pageOptions = [
    { value: 10, label: `10 Rows` },
    { value: 25, label: `25 Rows` },
    { value: 50, label: `50 Rows` },
    { value: 100, label: `100 Rows` },
  ];

  useEffect(() => {
    if (pageable) {
      // setLast(pageable.last);
      // setFirst(pageable.first);
      setTotalElements(pageable.total_elements);
      setTotalPages(pageable.total_pages);
      setNumberOfElements(pageable.number_of_elements);
      // setPage(pageable.number);
    }
  }, [pageable]);

  useEffect(() => {
    setOffset(0);
    setLimit(defaultLimit);
  }, [debouncedSearchText, defaultLimit]);

  return {
    limit,
    offset,
    setOffset,
    setLimit,
    totalElements,
    totalPages,
    numberOfElements,
    setPageable,
    page,
    setPage,
    pageOptions,
    searchText,
    debouncedSearchText,
    setSearchText,
    pageable,
  };
};

export default usePaginationWrapper;
