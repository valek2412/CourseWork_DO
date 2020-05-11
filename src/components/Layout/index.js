import React from "react";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="d-flex flex-column align-items-center p-3 mb-3">
        {children}
      </div>
      {/* <Footer /> */}
    </div>
  );
};
export default Layout;
