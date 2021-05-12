const Season = ({ season }) => {
  return (
    <>
      <div className="flex flex-col object-contain m-2 transition duration-100 transform border-2 rounded shadow-lg hover:scale-105 ">
        <div className="inline-block w-48 h-auto max-w-xs">
          <img
            className="object-center mx-auto border-b-2 "
            src={
              season.poster_path !== null
                ? `https://image.tmdb.org/t/p/w500/${season.poster_path}`
                : "https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg"
            }
            alt={season.name}
          />
          <div className="px-6 py-4 ">
            <div className="w-full text-lg font-bold text-left md:text-xl ">
              <p>{season.name}</p>
            </div>
            <div className="pb-2">
              {season.air_date && (
                <p>{new Date(season.air_date).getFullYear()}</p>
              )}
              {season.episode_count && <p>Episodes :{season.episode_count}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Season;
