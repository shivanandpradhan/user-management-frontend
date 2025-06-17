import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold text-indigo-600 mb-8">
        User Management System
      </h1>
      <div className="space-x-4">
        <Link
          to="/login"
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-gray-50"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Home;
