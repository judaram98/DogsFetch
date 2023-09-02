import { useEffect, useState } from "react";
import Pagination from "../../sections/Pagination";
import HeaderLogOut from "../../sections/HeaderLogOut";
import SearchFilter from "../../sections/SearchFilter";
import Dogs from "../../sections/Dogs";
import MatchView from "../../sections/MatchView";

const Dashboard = () => {
  const [selectedBreed, setSelectedBreed] = useState<string>("");
  const [order, setOrder] = useState<string>("asc");
  const [totalResults, setTotalResults] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [favoriteDogs, setFavoriteDogs] = useState<string[]>(() => {
    const saved = localStorage.getItem("favoriteDogs");
    const initialValue = JSON.parse(saved ?? "[]"); // Usar un array vacío como valor predeterminado si saved es null
    return initialValue;
  });
  const [match, setMatch] = useState(false);
  const [canMatch, setCanMatch] = useState(false);

  useEffect(() => {
    localStorage.setItem("favoriteDogs", JSON.stringify(favoriteDogs));
    if (favoriteDogs.length === 0) {
      setMatch(false);
      setCanMatch(false);
    } else {
      setCanMatch(true);
    }
    console.log(favoriteDogs);
  }, [favoriteDogs]);

  return (
    <main className="h-screen px-5 sm:px-10 md:px-14 lg:px-20 pt-5 sm:pt-8 md:pt-11 xl:pt-14">
      <HeaderLogOut
        match={match}
        setMatch={setMatch}
        favoriteDogs={favoriteDogs}
        canMatch={canMatch}
        setCanMatch={setCanMatch}
      />
      {match ? (
        <>
          <MatchView
            setMatch={setMatch}
            favoriteDogs={favoriteDogs}
            setFavoriteDogs={setFavoriteDogs}
          />
        </>
      ) : (
        <>
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
            favoriteDogs={favoriteDogs}
            setFavoriteDogs={setFavoriteDogs}
          />
          <Pagination totalResults={totalResults} setPage={setPage} />
        </>
      )}
    </main>
  );
};

export default Dashboard;
