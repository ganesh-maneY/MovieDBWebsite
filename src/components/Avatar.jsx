const Avatar = ({ cast }) => {
  return (
    <>
      <div className="flex flex-col object-contain m-2 transition duration-100 transform border-2 rounded shadow-lg hover:scale-105 ">
        <div className="inline-block w-48 h-auto max-w-xs">
          <img
            className="object-center mx-auto border-b-2 "
            src={cast.img}
            alt={cast.title}
          />
          <div className="px-6 py-4 ">
            <div className="w-full text-lg font-bold text-left md:text-xl ">
              <p>{cast.name}</p>
            </div>
            <div className="pb-2">
              <p className="overflow-x-auto noscroll">{cast.character}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Avatar;
