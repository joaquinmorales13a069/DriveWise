import { useState } from "react";
import DriveWise from "../assets/DriveWise_logo.png";
import { IoMdMenu } from "react-icons/io";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };



  return (
    <header className={"w-full"}>
      <nav className={"flex items-center justify-between"}>
        <div className={""}>
          <a href={"/"}>
            <img src={DriveWise} alt="DriveWise Logo" className={"w-32"} />
          </a>
        </div>
        {/*  Navbar content for large screens */}
        <div className={"md:flex items-center gap-3 hidden text-stone-700"}>
          <a
            href={"/"}
            className={
              "block text-[#047627] hover:text-[#E9DD2B] py-2 px-4 no-underline"
            }
          >
            Home
          </a>
          <a
            href={"/"}
            className={
              "block text-[#047627] hover:text-[#E9DD2B] py-2 px-4 no-underline"
            }
          >
            Catalog
          </a>
          <a
            href={"/"}
            className={
              "block text-[#047627] hover:text-[#E9DD2B] py-2 px-4 no-underline"
            }
          >
            About Us
          </a>
          <a
            href={"/"}
            className={
              "block text-[#047627] hover:text-[#E9DD2B] py-2 px-4 no-underline"
            }
          >
            Contact Us
          </a>
        </div>
        {/* Login Button */}
        <div>
          <button
            className={
              "px-4 p-2 border-[#047627] rounded-md text-[#047627] hover:text-white bg-white hover:bg-[#047627] shadow-md"
            }
          >
            Log in
          </button>
        </div>
        {/* Sandwich button for small screens */}
        <button
          className={
            "flex items-center justify-center lg:hidden text-[#047627] text-3xl bg-white border-none"
          }
          onClick={toggleMenu}
        >
          <IoMdMenu />
        </button>

        
        
      </nav>
      {/* Navbar content for small devices */}
      {isMenuOpen && (
          <div className={"mt-4 text-white bg-[#047627] rounded-md"}>
            <a
              href={"/"}
              className={
                "block py-2 px-4 no-underline text-white"
              }
            >
              Home
            </a>
            <a
              href={"/"}
              className={
                "block py-2 px-4 no-underline text-white"
              }
            >
              Catalog
            </a>
            <a
              href={"/"}
              className={
                "block py-2 px-4 no-underline text-white"
              }
            >
              About Us
            </a>
            <a
              href={"/"}
              className={
                "block py-2 px-4 no-underline text-white"
              }
            >
              Contact Us
            </a>
          </div>
        )}
    </header>
  );
}
