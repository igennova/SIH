import { motion, useAnimation } from "framer-motion";
import React from "react";
import { FaArrowUpLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Featured = () => {
  const cards = [useAnimation(), useAnimation()];
  const handleHoverStart = (index) => {
    cards[index].start({
      y: "0",
    });
  };
  const handleHoverEnd = (index) => {
    cards[index].start({
      y: "100%",
    });
  };
  return (
    <div className="container w-full sm:pt-20 pt-10 pb-20">
      <div className="w-full border-b-[1px] border-zinc-700 pb-5">
        <h1 className="text-4xl sm:text-6xl">Featured Projects</h1>
      </div>
      <div className="py-10 cards w-full flex flex-col md:flex-row gap-10">
        <motion.a
          onHoverStart={() => handleHoverStart(0)}
          onHoverEnd={() => handleHoverEnd(0)}
          className="cardcontainer cursor-pointer relative md:w-1/2 w-full h-full"
          href="/model"
        >
          <h1 className="mb-4 flex gap-2 items-center tracking-wide">
            <span className="w-2 h-2 bg-zinc-50 rounded-full"></span> AI Text Translator
          </h1>
          <h1 className="absolute text-[#CDEA68] flex overflow-hidden left-1/2 sm:left-full -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 text-8xl font-NueueMontreal leading-none tracking-tighter">
            {"TRANSLATOR".split("").map((item, index) => (
              <motion.span
                initial={{ y: "100%" }}
                animate={cards[0]}
                transition={{ ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
                className="inline-block"
                key={index}
              >
                {item}
              </motion.span>
            ))}
          </h1>
          <div className="card w-full h-[300px] flex items-center rounded-xl overflow-hidden">
            <img
              className="w-full h-auto object-cover hover:scale-105 transition-all"
              src="project1.jpg"
              alt="featured"
            />
          </div>
        </motion.a>
        <motion.a
          onHoverStart={() => handleHoverStart(1)}
          onHoverEnd={() => handleHoverEnd(1)}
          className="cardcontainer cursor-pointer relative md:w-1/2 w-full h-full"
          href="/test"
        >
          <h1 className="mb-4 flex gap-2 items-center tracking-wide">
            <span className="w-2 h-2 bg-zinc-50 rounded-full"></span> AI Text Convertor
          </h1>
          <h1 className="absolute flex overflow-hidden text-[#CDEA68] right-1/2 sm:right-full translate-x-1/2 top-1/2 -translate-y-1/2 z-10 text-8xl font-NueueMontreal leading-none tracking-tighter">
            {"CONVERTOR".split("").map((item, index) => (
              <motion.span
                initial={{ y: "100%" }}
                animate={cards[1]}
                transition={{ ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
                className="inline-block"
                key={index}
              >
                {item}
              </motion.span>
            ))}
          </h1>
          <div className="card w-full h-[300px] flex items-center rounded-xl overflow-hidden">
            <img
              className="w-full h-auto object-cover hover:scale-105 transition-all"
              src="project2.jpg"
              alt="featured"
            />
          </div>
        </motion.a>
      </div>
      <Link to="/data" className="m-auto rounded-full flex gap-2 justify-center w-fit bg-[#004D43] font-NueueMontreal text-zinc-100 px-10 py-3 text-sm tracking-wider uppercase">
        Learn Sign Language
        <FaArrowUpLong className="rotate-45 origin-center translate-y-[2px]" />
      </Link>
    </div>
  );
}

export default Featured;
