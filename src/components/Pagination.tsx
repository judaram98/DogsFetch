import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  info: { pages: number } | null;
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({
  info,
  pageNumber,
  setPageNumber,
}) => {
  const [width, setWidth] = useState<number>(window.innerWidth);

  const updateDimension = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateDimension);
    return () => window.removeEventListener("resize", updateDimension);
  }, []);

  const styles = `
    @media (max-width: 768px) {
      .next,
      .prev {
        display: none;
      }
      .pagination {
        font-size: 14px;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <ReactPaginate
        className="pagination justify-content-center gap-4 my-4"
        forcePage={pageNumber === 1 ? 0 : pageNumber - 1}
        nextLabel="Next"
        previousLabel="Prev"
        nextClassName="btn btn-primary next"
        previousClassName="btn btn-primary prev"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        marginPagesDisplayed={width < 576 ? 1 : 2}
        pageRangeDisplayed={width < 576 ? 1 : 2}
        activeClassName="active"
        onPageChange={(data) => {
          setPageNumber(data.selected + 1);
        }}
        pageCount={info?.pages || 1}
      />
    </>
  );
};

export default Pagination;
