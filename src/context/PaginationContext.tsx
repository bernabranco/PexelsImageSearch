import React, {createContext, useState, useContext} from 'react';

interface PaginationContextType {
  currentPage: number;
  nextPage: () => void;
  previousPage: () => void;
  resetPageCount: () => void;
}

const PaginationContext = createContext<PaginationContextType>({
  currentPage: 1,
  nextPage: () => {},
  previousPage: () => {},
  resetPageCount: () => {},
});

export const PaginationProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const resetPageCount = () => {
    setCurrentPage(1);
  };

  const nextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  return (
    <PaginationContext.Provider
      value={{currentPage, nextPage, previousPage, resetPageCount}}>
      {children}
    </PaginationContext.Provider>
  );
};

export const usePaginationContext = (): PaginationContextType => {
  return useContext(PaginationContext);
};
