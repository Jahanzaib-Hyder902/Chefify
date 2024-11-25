import React from 'react';
import { Spotlight } from './ui/Spotlight';
import { Button } from './ui/moving-border';
import Link from 'next/link';
import "@/app/styles/fonts.module.css";

async function Herosection() {
  return (
    <div>
      <div className="h-auto md:h-[40rem] w-full rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto py-10 md:py-0">
        <div className="p-4 relative z-10 w-full text-center">
          <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
          <h1 className='mt-20 md:mt-0 text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400'
          style={{ fontFamily: "angrybird", color: "#fe9e0d" }}
          >
            Homify
          </h1>
          <h3 className='mt-9 font-normal text-base md:text-lg text-neutral-300 max-w-lg mx-auto'>
            Transforming Homes, Enriching Lives with Artificial Intelligence.
          </h3>
          <h1 className="Home-primary-heading">
            Discover recipes, stay informed, and connect with loved ones—all in one place!
            <span style={{ fontFamily: "angrybird", color: "#fe9e0d" }}> Homify</span>
          </h1>
        </div>

        <div className="mt-4">
          <Link href="./../pages/RecipeGenerator">
            <Button
              borderRadius="1.75rem"
              className="bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-800"
            >
              Generate A Recipe
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Herosection;
