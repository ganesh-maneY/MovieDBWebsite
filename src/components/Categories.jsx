const Categories = ({ genres, currentGenre, setCurrentGenre, classes }) => {
  const handleClick = (id) => {
    setCurrentGenre(id);
  };

  return (
    <div className="relative">
      <div
        className={`flex py-4 px-10 sm:px-20 text-xl align-middle whitespace-nowrap space-x-10 sm:space-x-20 overflow-x-hidden hover:overflow-x-scroll hover:scrollbar-thin hover:scrollbar-thumb-gray-700 hover:scrollbar-track-gray-300 hover:scrollbar-thumb-rounded-full hover:scrollbar-track-rounded-full border-b-2 ${classes}`}
      >
        {genres.map((genre, index) => (
          <h2
            className={`${
              !classes && "last:pr-36"
            } transition duration-100 transform hover:scale-125 hover:text-red-400 active:text-red-500 cursor-pointer ${
              currentGenre === genre.id ? "text-red-400" : null
            }`}
            key={index}
            onClick={() => handleClick(genre.id)}
          >
            {genre.name}
          </h2>
        ))}
      </div>
      <div className="absolute top-0 right-0 bg-gradient-to-l from-[#06202a] h-10 w-1/12" />
    </div>
  );
};

export default Categories;
