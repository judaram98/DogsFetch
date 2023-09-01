import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import HeaderLogOut from "../../sections/HeaderLogOut";
import SearchFilter from "../../sections/SearchFilter";
import Dogs from "../../sections/Dogs";

const Dashboard = () => {
  const [selectedBreed, setSelectedBreed] = useState<string>("");
  const [order, setOrder] = useState("asc");
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(0);

  return (
    <main className="h-screen px-20 pt-14">
      <HeaderLogOut />
      <SearchFilter
        selectedBreed={selectedBreed}
        setSelectedBreed={setSelectedBreed}
        order={order}
        setOrder={setOrder}
      />
      <Dogs
        selectedBreed={selectedBreed}
        order={order}
        setTotalResults={setTotalResults}
        page={page}
      />
      <Pagination totalResults={totalResults} setPage={setPage} />
    </main>
  );
};

export default Dashboard;
