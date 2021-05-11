// import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="tracking-widest text-4xl bg-[#06202a] flex justify-center items-center h-16 w-full fixed shadow-2xl border-b-2 font-mono z-50 ">
      <p
        className="cursor-pointer hover:text-red-400"
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        MovieDB
      </p>
    </header>
  );
};

export default Header;
