import ReactPlayer from "react-player/lazy";

const PlayVideo = ({ setShowModal, url }) => {
  return (
    <>
      <div className="p-5 z-50">
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${url}`}
          className="absolute top-0 left-0"
          playing
          width="100%"
          height="100%"
          controls={true}
        />
        <button
          className="absolute top-4 -right-5 md:right-40 text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => setShowModal(false)}
        >
          Close
        </button>
      </div>

      <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default PlayVideo;
