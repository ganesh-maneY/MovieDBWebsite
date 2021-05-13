import ReactPlayer from "react-player/lazy";
import { XIcon } from "@heroicons/react/solid";

const PlayVideo = ({ setShowModal, url }) => {
  return (
    <>
      <div className="z-50 p-5">
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${url}`}
          className="absolute top-0 left-0"
          playing
          width="100%"
          height="100%"
          controls={true}
        />
        <button
          className="absolute px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none top-4 -right-5 md:right-40 background-transparent focus:outline-none"
          type="button"
          onClick={() => setShowModal(false)}
        >
          <XIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="fixed inset-0 z-40 bg-black opacity-75"></div>
    </>
  );
};

export default PlayVideo;
