import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-indigo-100 via-white to-indigo-200 p-6 relative overflow-hidden">
      {/* Decorative SVG wave */}
      <svg
        className="absolute top-0 left-0 w-full h-40 md:h-64 text-indigo-200"
        fill="currentColor"
        viewBox="0 0 1440 320"
        aria-hidden="true"
      >
        <path
          fillOpacity="1"
          d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        ></path>
      </svg>

      {/* 404 Illustration */}
      <div className="relative z-10 mb-8">
        <div className="flex items-center justify-center gap-2">
          <span className="text-[5rem] md:text-[7rem] font-black text-indigo-400 drop-shadow-lg animate-bounce">
            4
          </span>
          <span className="inline-flex items-center justify-center w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 shadow-lg animate-spin-slow">
            <svg
              className="w-10 h-10 md:w-14 md:h-14 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="white"
                strokeOpacity={0.3}
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 9l6 6m0-6l-6 6"
              />
            </svg>
          </span>
          <span className="text-[5rem] md:text-[7rem] font-black text-indigo-400 drop-shadow-lg animate-bounce">
            4
          </span>
        </div>
      </div>

      {/* Message */}
      <div className="relative z-10 max-w-lg w-full bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl px-8 py-10 text-center border border-indigo-100">
        <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-700 mb-2 tracking-tight">
          Oops! Lost in Space
        </h1>
        <p className="text-base md:text-lg text-gray-600 mb-8">
          The page you’re looking for can’t be found.
          <br />
          Maybe you took a wrong turn, or the page has moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-700 transition-all hover:shadow-lg"
          >
            Take Me Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 border border-indigo-200 text-indigo-700 font-semibold rounded-xl shadow-sm hover:bg-indigo-50 transition-all"
          >
            Previous Page
          </button>
        </div>
      </div>

      {/* Decorative floating stars */}
      <div className="absolute top-10 right-10 w-3 h-3 bg-yellow-300 rounded-full opacity-80 animate-pulse"></div>
      <div className="absolute bottom-16 left-16 w-2 h-2 bg-indigo-300 rounded-full opacity-60 animate-ping"></div>
      <div className="absolute bottom-24 right-24 w-4 h-4 bg-indigo-200 rounded-full opacity-70 animate-pulse"></div>
    </div>
  );
};

export default NotFound;
