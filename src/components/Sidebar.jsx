import { useState } from "react";
import DriveWise from "../assets/DriveWise_logo.png";
import { IoMdMenu } from "react-icons/io";

export default function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(true); // default to true for sidebar always visible on large screens

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div style={{ width: isMenuOpen ? 250 : 0, transition: 'width 0.3s' }}>
      <div className={"flex flex-col h-full bg-[#047627] text-white"}>
        <div className={"p-5 border-b border-white"}>
          <a href={"/"}>
            <img src={DriveWise} alt="DriveWise Logo" className={"w-32"} />
          </a>
          <button
            className={"text-xl"}
            onClick={toggleMenu}
            style={{ position: 'absolute', top: 20, right: 20 }}
          >
            <IoMdMenu />
          </button>
        </div>
        <div className={"flex flex-col"}>
          <a href={"/information"} className={"py-2 px-4 hover:bg-green-700"}>Personal Information</a>
          <a href={"/bookings"} className={"py-2 px-4 hover:bg-green-700"}>Booking</a>
        </div>
      </div>
      {/* Overlay to close the menu when clicked outside */}
      {isMenuOpen && (
        <div
          className={"fixed inset-0 bg-black opacity-50"}
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </div>
  );
}
