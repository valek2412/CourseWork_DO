import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
    <h5 className="my-0 font-weight-normal">
      <Link to="/">На початок</Link>
    </h5>
    <nav className="ml-auto mr-3">
      <Link to="/state" className="p-2 text-dark">
        State
      </Link>
      <Link to="/dummy" className="p-2 text-dark">
        Dummy
      </Link>
      <Link to="/link1" className="p-2 text-dark">
        Link 1
      </Link>
      <Link to="/link2" className="p-2 text-dark">
        Link 2
      </Link>
      <Link to="/link3" className="p-2 btn btn-outline-primary">
        Link 3
      </Link>
    </nav>
  </div>
);
export default Header;
