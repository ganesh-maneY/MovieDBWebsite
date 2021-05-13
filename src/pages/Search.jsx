import { useEffect, useRef, useState } from "react";
import {
  SearchIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/solid";
import Categories from "../components/Categories";
import Thumbnail from "../components/Thumbnail";
import FlipMove from "react-flip-move";
import { fetchSearch } from "../utils/api";
const types = [
  { id: "movie", name: "Movies" },
  { id: "tv", name: "TV Series" },
];
const Search = () => {
  const [activeType, setActiveType] = useState("movie");
  const [input, setInput] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [movieList, setMovieList] = useState([]);
  const [pageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinimumPageNumberLimit] = useState(1);
  const [maxPageNumberLimit, setMaximumPageNumberLimit] = useState(5);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  const handleClick = useRef(() => {});

  useEffect(() => {
    handleClick.current();
  }, [currentPage]);

  useEffect(() => {
    // setInput("");
    setMovieList([]);
    setTotalPages(0);
    setCurrentPage(1);
    setIsLoading(true);
    setMinimumPageNumberLimit(1);
    setMaximumPageNumberLimit(5);
    handleClick.current();
  }, [activeType]);

  handleClick.current = async (e) => {
    setIsLoading(true);
    if (input.trim().length > 0) {
      const response = await fetchSearch(currentPage, activeType, input);
      setMovieList(response.slice(1, response.length - 1));
      setTotalPages(response.slice(response.length - 1)[0].total_pages);
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-16 pb-20">
      <div className="flex justify-center">
        <div className="flex flex-row items-center mt-2 -mb-2 text-black rounded-full shadow-xl md:flex-1 bg-gray-50 md:my-2 md:max-w-xl">
          <input
            className="w-full px-6 py-2.5 leading-tight text-black bg-transparent rounded-l-full md:py-4 focus:outline-none"
            id="search"
            type="text"
            placeholder="Search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleClick.current();
              }
            }}
          />
          <div className="flex flex-col justify-center pr-5">
            <button
              className="focus:outline-none"
              onClick={handleClick.current}
            >
              <SearchIcon className="w-5 h-5 md:w-7 md:h-7" />
            </button>
          </div>
        </div>
      </div>
      <Categories
        genres={types}
        currentGenre={activeType}
        setCurrentGenre={setActiveType}
        classes="justify-center"
      />
      <FlipMove className="flex flex-wrap justify-center pt-4 pb-12 overflow-y-hidden gap-y-5">
        {movieList.map((movie) => (
          <Thumbnail key={movie.id} movie={movie} />
        ))}
      </FlipMove>
      {!isLoading && (
        <div className="flex items-center justify-between py-3 px-auto sm:px-6">
          <div className="flex items-center justify-center flex-1">
            <div>
              <nav
                className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <button
                  onClick={() => {
                    setCurrentPage(currentPage - 1);
                    if ((currentPage - 1) % pageNumberLimit === 0) {
                      setMaximumPageNumberLimit(
                        maxPageNumberLimit - pageNumberLimit
                      );
                      setMinimumPageNumberLimit(
                        minPageNumberLimit - pageNumberLimit
                      );
                    }
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                  className={`relative inline-flex items-center px-px md:px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-red-500 hover:text-gray-50 focus:outline-none ${
                    currentPage === pageNumbers[0]
                      ? "cursor-not-allowed disabled:bg-gray-500 text-gray-50"
                      : null
                  }`}
                  disabled={currentPage === pageNumbers[0] ? "disabled" : null}
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
                </button>
                <button
                  onClick={async () => {
                    if (minPageNumberLimit - pageNumberLimit > 0) {
                      setMaximumPageNumberLimit(
                        maxPageNumberLimit - pageNumberLimit
                      );
                      setMinimumPageNumberLimit(
                        (await minPageNumberLimit) - pageNumberLimit
                      );
                      setCurrentPage(minPageNumberLimit - pageNumberLimit);
                    }
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                  className={`relative inline-flex items-center px-1 md:px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-red-500 hover:text-gray-50 focus:outline-none ${
                    minPageNumberLimit === pageNumbers[0]
                      ? "cursor-not-allowed bg-gray-500 text-gray-50"
                      : null
                  }`}
                  disabled={
                    minPageNumberLimit === pageNumbers[0] ? "disabled" : null
                  }
                >
                  <DotsHorizontalIcon className="w-5 h-5" />
                </button>
                {pageNumbers.map(
                  (number) =>
                    number < maxPageNumberLimit + 1 &&
                    number > minPageNumberLimit - 1 && (
                      <button
                        onClick={(e) => {
                          setCurrentPage(parseInt(e.target.id, 10));
                          window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                          });
                        }}
                        id={number}
                        key={number}
                        className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-red-500 hover:text-gray-50 focus:outline-none ${
                          currentPage === number
                            ? "bg-red-500 text-white "
                            : null
                        }`}
                      >
                        {number}
                      </button>
                    )
                )}
                <button
                  onClick={() => {
                    if (currentPage + pageNumberLimit <= totalPages) {
                      setMaximumPageNumberLimit(
                        maxPageNumberLimit + pageNumberLimit
                      );
                      setMinimumPageNumberLimit(
                        minPageNumberLimit + pageNumberLimit
                      );
                      setCurrentPage(maxPageNumberLimit + 1);
                    }
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                  className={`relative inline-flex items-center px-1 md:px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-red-500 hover:text-gray-50 focus:outline-none ${
                    maxPageNumberLimit >= totalPages
                      ? "cursor-not-allowed disabled:bg-gray-500 text-gray-50"
                      : null
                  }`}
                  disabled={
                    maxPageNumberLimit >= totalPages ? "disabled" : null
                  }
                >
                  <DotsHorizontalIcon className="w-5 h-5" />
                </button>
                <p
                  className={`relative hidden md:inline-flex items-center px-1 md:px-2 py-2 border border-gray-300 text-sm font-medium  focus:outline-none bg-gray-500 text-gray-50`}
                >
                  {totalPages}
                </p>
                <button
                  onClick={() => {
                    setCurrentPage(currentPage + 1);
                    if (currentPage + 1 > maxPageNumberLimit) {
                      setMaximumPageNumberLimit(
                        maxPageNumberLimit + pageNumberLimit
                      );
                      setMinimumPageNumberLimit(
                        minPageNumberLimit + pageNumberLimit
                      );
                    }
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                  className={`relative inline-flex items-center px-px md:px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-red-500 hover:text-gray-50 focus:outline-none ${
                    currentPage === pageNumbers[pageNumbers.length - 1]
                      ? "cursor-not-allowed disabled:bg-gray-500 text-gray-50"
                      : null
                  }`}
                  disabled={
                    currentPage === pageNumbers[pageNumbers.length - 1]
                      ? "disabled"
                      : null
                  }
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
