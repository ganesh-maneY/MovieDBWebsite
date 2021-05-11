const Avatar = ({ cast }) => {
  return (
    <>
      <div className="flex flex-col  object-contain  rounded shadow-lg m-2 border-2 transition duration-100 transform hover:scale-105 ">
        <div className="inline-block w-48 h-auto max-w-xs">
          <img
            className="object-center  mx-auto border-b-2 "
            src={cast.img}
            alt={cast.title}
          />
          <div className="px-6 py-4 ">
            <div className="w-full text-left font-bold text-lg md:text-xl ">
              <p>{cast.name}</p>
            </div>
            <div className="pb-2">
              <p>{cast.character}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Avatar;
