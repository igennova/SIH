import React from "react";
import { LuMenu } from "react-icons/lu";
import { Link } from "react-router-dom";

function Navbar() {
  const navLinks = ["Features", "Learning" , "Our Mission", "About Us", "Contact"];
  return (
    <div className="sticky bg-zinc-900/40 backdrop-blur-md top-0 z-[999] py-4 sm:py-5">
      <div className="container w-full font-NueueMontreal flex items-center justify-between">
        <div className="logo">
          <h1 className="text-md font-light capitalize whitespace-nowrap cursor-pointer">Ehsaas</h1>
        </div>
        <div className="items-center gap-10 hidden md:flex">
          {navLinks.map((item, index) => (
            <a
              key={index}
              className={`text-md font-light capitalize whitespace-nowrap cursor-pointer ${
                index === 4 && "ml-[10vw]"
              }`}
            >
              {item}
            </a>
          ))}
          <Link to="/events">Events</Link>
          <Link to="/video">Videototext</Link>
        </div>
        <LuMenu className="md:hidden block text-3xl" />
      </div>
    </div>
  );
}

export default Navbar;
