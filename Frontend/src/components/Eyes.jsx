import React, { useEffect, useState } from "react";
import { FaArrowUpLong } from "react-icons/fa6";

function Eyes() {
  return (
    <div className="w-full back bg-left bg-black bg-cover bg-no-repeat h-[300px] md:h-[800px] overflow-hidden">

      <div className="container z-99 relative">
        <h1 className="text-7xl pb-4 font-FoundersGroteskCondensed pt-20">Giving Them EHSAAS <br /> That They aren't Alone</h1>
        <div className="rounded-full flex gap-2 justify-center w-fit bg-[#004D43] font-NueueMontreal text-zinc-100 px-10 py-3 text-sm tracking-wider uppercase">
          Join Us!
          <FaArrowUpLong className="rotate-45 origin-center translate-y-[2px]" />
        </div>
      </div>
    </div>
  );
}

export default Eyes;
