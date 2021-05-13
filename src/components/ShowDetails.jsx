import { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import { fetchCredits, fetchSimilar, fetchVideo } from "../utils/api";
import Avatar from "./Avatar";
import Thumbnail from "./Thumbnail";
import PlayVideo from "./PlayVideo";
import { PlayIcon } from "@heroicons/react/solid";
import FlipMove from "react-flip-move";
import Season from "./Season";

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
      <h2 className="mb-4 text-xl font-bold text-center md:text-4xl">
        {details.title || details.name}
      </h2>
      <div className="relative flex items-center">
        <div className="w-full px-0 py-2 md:px-4 md:py-5 ">
          <img
            className="w-full h-auto align-middle border-2 rounded shadow"
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
        {movieVideo && (
          <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <PlayIcon
              className="h-16 opacity-50 cursor-pointer md:h-40"
              onClick={() => setShowVideo(true)}
            />
          </div>
        )}
        {showVideo && (
          <PlayVideo url={movieVideo} setShowModal={setShowVideo} />
        )}
      </div>

      {details.genres && (
        <div>
          <h2 className="text-sm font-bold text-left md:text-xl ">Genre:</h2>
          {details.genres &&
            details.genres.map((genre) => (
              <button
                key={genre.id}
                className="px-4 py-2 text-sm font-bold bg-transparent rounded-full hover:bg-red-500 hover:text-white focus:outline-none md:text-xl"
              >
                {genre.name}
              </button>
            ))}
        </div>
      )}
      {details.spoken_languages && (
        <div>
          <h2 className="text-sm font-bold text-left md:text-xl ">Language:</h2>
          {details.spoken_languages &&
            details.spoken_languages.map((language) => (
              <button
                key={language.name}
                className="px-4 py-2 text-sm font-bold bg-transparent rounded-full hover:bg-red-500 hover:text-white focus:outline-none md:text-xl"
              >
                {language.english_name}
              </button>
            ))}
        </div>
      )}
      {details.vote_average && (
        <>
          <div className="flex flex-col justify-between md:flex-row">
            <div className="flex flex-col">
              <h2 className="mt-4 text-sm font-bold text-left md:text-xl ">
                {`Rating : ${details.vote_average}/10`}
              </h2>
              <StarRatings
                rating={details.vote_average}
                starRatedColor="gold"
                numberOfStars={10}
                starDimension="20px"
                starSpacing="2px"
                name="rating"
              />
            </div>

            <h2 className="mt-4 text-sm font-bold text-left md:text-xl ">
              {`Release Date : ${
                details.release_date || details.first_air_date
              }`}
            </h2>
          </div>
        </>
      )}
      {details.overview && (
        <div>
          <h2 className="mt-4 text-sm font-bold text-left md:text-xl ">
            Overview :
          </h2>
          <p className="pl-2 text-sm md:text-xl">{details.overview}</p>
        </div>
      )}

      <div className="flex-nowrap">
        {details.runtime && (
          <div>
            <h2 className="mt-4 text-sm font-bold text-left md:text-xl ">
              Run Time :
            </h2>
            <p className="pl-2 text-sm md:text-xl">{`${Math.floor(
              details.runtime / 60
            )} Hours ${details.runtime % 60} Minutes`}</p>
          </div>
        )}
        {details.episode_run_time && (
          <div>
            <h2 className="mt-4 text-sm font-bold text-left md:text-xl ">
              Episode Run Time :
            </h2>
            <p className="pl-2 text-sm md:text-xl">
              {details.episode_run_time[0]} Minutes
            </p>
          </div>
        )}
        {details.homepage && (
          <div>
            <h2 className="mt-4 text-sm font-bold text-left md:text-xl ">
              Home Page :
            </h2>
            <a
              className="pl-2 text-sm cursor-pointer md:text-xl"
              href={details.homepage}
              target="_blank"
              rel="noreferrer"
            >
              {details.homepage}
            </a>
          </div>
        )}
      </div>
      {cast[cast.length - 1] !== undefined && (
        <h2 className="mt-4 text-sm font-bold text-left md:text-xl ">
          Director :
        </h2>
      )}
      <p className="pl-2 text-sm md:text-xl">{cast[cast.length - 1]}</p>
      {details.seasons && details.seasons.length > 0 && (
        <h2 className="mt-4 text-sm font-bold text-left md:text-xl ">
          Seasons :
        </h2>
      )}

      <div className="flex py-4 overflow-x-scroll overflow-y-hidden gap-x-5 noscroll hover:showscroll hover:overflow-x-scroll hover:scrollbar-thin hover:scrollbar-thumb-gray-700 hover:scrollbar-track-gray-300 hover:scrollbar-thumb-rounded-full hover:scrollbar-track-rounded-full">
        {details.seasons &&
          details.seasons.map((season, index) => (
            <Season key={index} season={season} />
          ))}
      </div>

      {cast.slice(0, cast.length - 1).length > 0 && (
        <h2 className="mt-4 text-sm font-bold text-left md:text-xl ">Cast :</h2>
      )}
      <div className="flex py-4 overflow-x-scroll overflow-y-hidden gap-x-5 noscroll hover:showscroll hover:overflow-x-scroll hover:scrollbar-thin hover:scrollbar-thumb-gray-700 hover:scrollbar-track-gray-300 hover:scrollbar-thumb-rounded-full hover:scrollbar-track-rounded-full">
        {cast.slice(0, cast.length - 1).map((c, index) => (
          <Avatar key={index} cast={c} />
        ))}
      </div>

      {similarMovies.length > 0 && (
        <h2 className="mt-4 text-sm font-bold text-left md:text-xl">
          Similar:
        </h2>
      )}
      <FlipMove className="flex flex-wrap justify-center pt-4 pb-12 overflow-y-hidden gap-y-5">
        {similarMovies.slice(0, 4).map((movie, index) => (
          <Thumbnail key={index} movie={movie} />
        ))}
      </FlipMove>
    </div>
  );
};

export default ShowDetails;
