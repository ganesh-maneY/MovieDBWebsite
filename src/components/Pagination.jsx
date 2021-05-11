import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/solid";
import { useState } from "react";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const [pageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinimumPageNumberLimit] = useState(1);
  const [maxPageNumberLimit, setMaximumPageNumberLimit] = useState(5);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="px-4 py-3 flex items-center justify-between sm:px-6">
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
              className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-500 hover:text-gray-50 focus:outline-none ${
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
              onClick={() => {
                if (minPageNumberLimit - pageNumberLimit > 0) {
                  setMaximumPageNumberLimit(
                    maxPageNumberLimit - pageNumberLimit
                  );
                  setMinimumPageNumberLimit(
                    minPageNumberLimit - pageNumberLimit
                  );
                  setCurrentPage(minPageNumberLimit - 1);
                }
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-500 hover:text-gray-50 focus:outline-none ${
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
                      currentPage === number ? "bg-red-500 text-white " : null
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
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-500 hover:text-gray-50 focus:outline-none ${
                maxPageNumberLimit === pageNumbers[pageNumbers.length - 1]
                  ? "cursor-not-allowed bg-gray-500 text-gray-50"
                  : null
              }`}
              disabled={
                maxPageNumberLimit === pageNumbers[pageNumbers.length - 1]
                  ? "disabled"
                  : null
              }
            >
              <DotsHorizontalIcon className="h-5 w-5" />
            </button>
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
              className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-500 hover:text-gray-50 focus:outline-none ${
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
  );
};

export default Pagination;
