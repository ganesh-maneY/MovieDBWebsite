import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { forwardRef } from "react";

const Thumbnail = forwardRef(({ movie }, ref) => {
  return (
    <div ref={ref}>
      <div
        className="flex flex-col w-full h-full max-h-full bg-[#052b3b] max-w-xs rounded-xl overflow-hidden shadow-lg my-2 mx-2 border-2 transition duration-100 transform hover:scale-105 hover:border-red-500 group align-middle"
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        <Link to={`/${movie.type}/${movie.id}`}>
          <img
            className="w-screen border-b-2"
            src={movie.poster}
            alt={movie.title}
          />
          <div className="px-6 py-4">
            <div className="w-full text-center font-bold group-hover:font-extrabold  text-xl group-hover:text-2xl">
              <p>{movie.title}</p>
            </div>
            <div className="flex justify-between pb-1">
              <p>{movie.rating}/10</p>
            </div>

            <StarRatings
              rating={movie.rating}
              starRatedColor="gold"
              numberOfStars={10}
              starDimension="20px"
              starSpacing="2px"
              name="rating"
            />
            <div className="flex justify-between pt-2">
              <p className="uppercase">
                {movie.type === "tv" ? "TV Series" : "Movie"}
              </p>
              {movie.date && <p>{new Date(movie.date).getFullYear()}</p>}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
});

export default Thumbnail;
