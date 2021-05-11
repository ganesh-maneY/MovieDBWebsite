import ReactPlayer from "react-player/lazy";

const PlayVideo = ({ setShowModal, url, name }) => {
  return (
    <>
      {/* <main class="absolute antialiased bg-transparent text-gray-900 font-sans overflow-x-hidden">
        <div class="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
          <div class="bg-transparent opacity-25 w-full h-full absolute z-10 inset-0"></div>

          <div class="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
            <div class=" mt-4 md:flex md:justify-end">
              <h3 className="text-xl md:text-3xl font-semibold">{name}</h3>
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
            <div class="flex items-start justify-between ">
              <div class="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                <i class="bx bx-error text-3xl"></i>
              </div>
              <div class="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                <div className="relative p-6 flex-auto justify-center">
                  <ReactPlayer url={`https://www.youtube.com/watch?v=${url}`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main> */}

      {/* <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl md:max-w-6xl">
          <div className="border-2 border-gray-400 rounded-lg shadow-lg relative flex flex-col w-full  outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-xl md:text-3xl font-semibold">{name}</h3>
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
            <div className="relative p-6 flex-auto justify-center">
              <ReactPlayer
                width="100%"
                height="100%"
                url={`https://www.youtube.com/watch?v=${url}`}
              />
            </div>
          </div>
        </div>
      </div> */}
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
          className="absolute top-4 right-40 text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
