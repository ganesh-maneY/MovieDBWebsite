import { useEffect, useState } from "react";
import { fetchGenres, fetchDiscover } from "../utils/api";
import Categories from "../components/Categories";
import Thumbnail from "../components/Thumbnail";
import FlipMove from "react-flip-move";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/solid";

const TV = () => {
  const [genres, setGenres] = useState([]);
  const [currentGenre, setCurrentGenre] = useState();
  const [tvList, setTvList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinimumPageNumberLimit] = useState(1);
  const [maxPageNumberLimit, setMaximumPageNumberLimit] = useState(5);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    setIsLoading(true);
    const fetchAPI = async () => {
      setGenres(await fetchGenres("tv"));
      const response = await fetchDiscover(currentPage, "tv", currentGenre);
      setTvList(response.slice(1, response.length - 1));
      setTotalPages(response.slice(response.length - 1)[0].total_pages);
      setIsLoading(false);
    };
    fetchAPI();
  }, [currentPage, currentGenre]);
  return (
    <div className="pt-16 pb-20 ">
      <Categories genres={genres} setCurrentGenre={setCurrentGenre} />
      <FlipMove className="flex flex-wrap justify-center overflow-y-hidden pt-4 pb-12 gap-y-5">
        {tvList.map((tv) => (
          <Thumbnail key={tv.id} movie={tv} />
        ))}
      </FlipMove>
      {!isLoading && (
        <div className="px-auto py-3 flex items-center justify-between sm:px-6">
          <div className="flex-1 flex items-center justify-center">
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
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
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
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
                  <DotsHorizontalIcon className="h-5 w-5" />
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
                  <DotsHorizontalIcon className="h-5 w-5" />
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
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TV;
