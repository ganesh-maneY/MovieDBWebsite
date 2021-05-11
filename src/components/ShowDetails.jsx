import { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import { fetchCredits, fetchSimilar, fetchVideo } from "../utils/api";
import Avatar from "./Avatar";
import Thumbnail from "./Thumbnail";
import PlayVideo from "./PlayVideo";
import { PlayIcon } from "@heroicons/react/solid";
import FlipMove from "react-flip-move";

const ShowDetails = ({ id, details, type }) => {
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [movieVideo, setMovieVideo] = useState("");
  const [showVideo, setShowVideo] = useState(false);
  useEffect(() => {
    const fetchAPI = async () => {
      setCast(await fetchCredits(id, type));
      setSimilarMovies(await fetchSimilar(id, type));
      setMovieVideo(await fetchVideo(id, type));
    };
    fetchAPI();
  }, [id, type]);
  return (
    <div className="flex flex-col mx-auto px-2.5 md:px-60 py-20 md:py-28">
      <h2 className="text-xl md:text-4xl font-bold text-center mb-4">
        {details.title || details.name}
      </h2>
      <div className="relative flex  items-center">
        <div className="w-full px-0 md:px-4 py-2 md:py-5 ">
          <img
            className="shadow rounded w-full h-auto align-middle border-2"
            src={`
              ${
                details.backdrop_path !== null
                  ? "https://image.tmdb.org/t/p/original/" +
                    details.backdrop_path
                  : "https://user-images.githubusercontent.com/10515204/56117400-9a911800-5f85-11e9-878b-3f998609a6c8.jpg"
              }`}
            alt={details.title}
          />
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <PlayIcon
            className="h-8 md:h-20 cursor-pointer"
            onClick={() => setShowVideo(true)}
          />
        </div>
        {showVideo && (
          <PlayVideo url={movieVideo} setShowModal={setShowVideo} />
        )}
      </div>

      <div>
        <h2 className="text-lg md:text-xl font-bold text-left ">Genre:</h2>
        {details.genres &&
          details.genres.map((genre) => (
            <button
              key={genre.id}
              className="bg-transparent hover:bg-red-500  font-bold hover:text-white py-2 px-4 rounded-full focus:outline-none"
            >
              {genre.name}
            </button>
          ))}
      </div>
      <div className="flex justify-between">
        <h2 className="text-sm md:text-xl font-bold text-left mt-4 ">
          {`Rating : ${details.vote_average}/10`}
        </h2>
        <h2 className="text-sm md:text-xl font-bold text-left mt-4 ">
          {`Release Date : ${details.release_date || details.first_air_date}`}
        </h2>
      </div>
      <StarRatings
        rating={details.vote_average}
        starRatedColor="gold"
        numberOfStars={10}
        starDimension="20px"
        starSpacing="2px"
        name="rating"
      />
      <h2 className="text-lg md:text-xl font-bold text-left mt-4 ">
        Overview :
      </h2>
      <p className="pl-2">{details.overview}</p>

      <div className="flex-nowrap">
        {details.runtime && (
          <div>
            <h2 className="text-lg md:text-xl font-bold text-left mt-4 ">
              Run Time :
            </h2>
            <p className="pl-2">{`${Math.floor(details.runtime / 60)} Hours ${
              details.runtime % 60
            } Minutes`}</p>
          </div>
        )}
        <h2 className="text-lg md:text-xl font-bold text-left mt-4 ">
          Home Page :
        </h2>
        <a
          className="cursor-pointer pl-2"
          href={details.homepage}
          target="_blank"
          rel="noreferrer"
        >
          {details.homepage}
        </a>
      </div>
      {cast[cast.length - 1] !== undefined && (
        <h2 className="text-lg md:text-xl font-bold text-left mt-4 ">
          Director :
        </h2>
      )}
      <p className="pl-2">{cast[cast.length - 1]}</p>
      <h2 className="text-lg md:text-xl font-bold text-left mt-4 ">Cast :</h2>
      <div
        className="flex 
gap-x-5 overflow-x-scroll noscroll hover:showscroll hover:overflow-x-scroll hover:scrollbar-thin hover:scrollbar-thumb-gray-700 hover:scrollbar-track-gray-300 hover:scrollbar-thumb-rounded-full hover:scrollbar-track-rounded-full overflow-y-hidden py-4"
      >
        {cast.slice(0, cast.length - 1).map((c, index) => (
          <Avatar key={index} cast={c} />
        ))}
      </div>

      {similarMovies.length > 0 && (
        <h2 className="text-lg md:text-xl font-bold text-left mt-4">
          Similar Movies:
        </h2>
      )}
      <FlipMove className="flex flex-wrap justify-center overflow-y-hidden pt-4 pb-12 gap-y-5">
        {similarMovies.slice(0, 4).map((movie, index) => (
          <Thumbnail key={index} movie={movie} />
        ))}
      </FlipMove>
    </div>
  );
};

export default ShowDetails;
