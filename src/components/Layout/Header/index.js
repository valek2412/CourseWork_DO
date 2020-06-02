import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
    <h5 className="my-0 font-weight-normal">
      <Link to="/">На початок</Link>
    </h5>
    <nav className="ml-auto mr-3">
      <Link to="genetic" className="p-2 text-dark">
        Генетичний
      </Link>
      <Link to="/bee" className="p-2 text-dark">
        Бджолиний
      </Link>
      <Link to="/greedy" className="p-2 text-dark">
        Жадібний
      </Link>
    </nav>
  </div>
);
export default Header;
