import React from "react";
import Header from "./Header/Header";
// import SideBar from "./SideBar/SideBar";

const Layouts = ({ children }) => {
  return (
    <>
      <Header />
      <div className="main-body">
        <div className="container-fluid">
          <div className="row">
            {/* <div className="col-lg-2">
              <SideBar />
            </div> */}
            <div className="col-lg-12">
              <div className="dashboard-body">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layouts;
