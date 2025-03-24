import React from "react";
import MainDrawer from "./MainDrawer";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

function MenuDrawer({ drawerOpen, toggleDrawer }) {
  // console.log("drawer open", drawerOpen);
  return (
    <MainDrawer drawerOpen={drawerOpen} closeDrawer={toggleDrawer}>
      <div className="flex w-full h-full justify-between items-center bg-main text-white rounded">
        <div className="w-full flex-btn h-16 px-6 py-4 bg-dry">
          <Link onClick={toggleDrawer} to="/">
            <img
              src="/images/logo.jpg"
              alt="logo"
              className="w-28 h-28 object-contain"
            />
          </Link>
          <button
            onClick={toggleDrawer}
            type="button"
            className="transitions w-10 h-10 flex-colo text-base text-subMain bg-white rounded-full font-bold hover:bg-subMain hover:text-subMain"
          >
            <IoClose />
          </button>
        </div>
      </div>
    </MainDrawer>
  );
}

export default MenuDrawer;
