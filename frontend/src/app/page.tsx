"use client";
import React, { useEffect, useState } from 'react';
import backgroundImageDesktop from '../../public/landing.jpg'; // Desktop background image
import backgroundImageMobile from '../../public/landing.jpg';   // Mobile background image
import Link from 'next/link'

import { Mate_SC } from "next/font/google";

const matesc = Mate_SC({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const Page = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if the window object is available (client-side)
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 769); // Check if the screen width is below 769px
    }
  }, []);

  return (
    <div
      className="bg-hero-image bg-cover bg-center h-screen relative"
      style={{
        backgroundImage: `url(${isMobile ? backgroundImageMobile : backgroundImageDesktop})`

      }}
    >
      <div className="absolute inset-0"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-white text-center">
          <h1 className={` text-9xl font-bold mb-4 ${matesc.className}`}>Skill Forge</h1>
          <p className="text-md mb-4 text-lg">Curated learning for everyone...</p>
          <Link href='/course' className="mt-10 w-96 bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-10 text-xl rounded">
            Begin
          </Link>
        </div>
      </div>
    </div >
  );
};

export default Page;
