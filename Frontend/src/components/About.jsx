import React from "react";
import { FaArrowUpLong } from "react-icons/fa6";

function About() {
  return (
    <div
      data-scroll
      data-scroll-section
      data-scroll-speed="0.01"
      className="w-full bg-[#1d1f1e] rounded-t-3xl py-10 sm:py-20"
    >
      <div className="container w-full">
        <h1 className="sm:text-3xl text-xl sm:leading-normal font-medium mb-10 border-b-[1px] border-zinc-700 pb-10">
          Ehsaas is a strategic Learning partner for Deaf and Mute Community that
          need to raise Voice, Education , explain Complex Ideas, and Communication
        </h1>
        <div className="md:flex justify-center gap-10">
          <div className="about-text h-fit">
            <h1 className="text-4xl mb-4">Our approach:</h1>
            <p className="text-base sm:text-xl text-zinc-200 tracking-wide">
              Our approach at Ehsaas is a strategic Learning partner for Deaf and Mute Community that
              need to raise Voice, Education , explain Complex Ideas, and Communication
            </p>
            <div className="rounded-full flex gap-2 justify-center mt-4 w-fit bg-[#004D43] text-zinc-100 px-10 py-3 text-sm tracking-wider uppercase">
              Read more
              <FaArrowUpLong className="rotate-45 origin-center translate-y-[2px]" />
            </div>
          </div>
          <img
            className="w-full rounded-3xl mt-10 md:w-[40vw] md:mt-0"
            src="deaf.jpg"
            alt="about us"
          />
        </div>
      </div>
    </div>
  );
}

export default About;
