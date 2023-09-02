import ReactPaginate from "react-paginate";

interface Params {
  totalResults: number;
  setPage: (page: number) => void;
}

const Pagination = ({ totalResults, setPage }: Params) => {
  return (
    <div className="h-[10%] md:h-[10%] flex items-center justify-center">
      <ReactPaginate
        previousLabel={"< Prev"}
        previousClassName="text-[#FBA819]"
        nextLabel={"Next >"}
        nextClassName="text-[#FBA819]"
        breakLabel={"..."}
        breakClassName={"text-neutral-300"}
        pageCount={totalResults / 25}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={(e) => setPage(e.selected)}
        containerClassName={"flex gap-4 text-neutral-500"}
        activeClassName={"text-[#FBA819]"}
      />
    </div>
  );
};

export default Pagination;
