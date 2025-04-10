import { Link } from "lucide-react";
import * as React from "react";

interface CourseModuleProps {
  title: string;
  description: string;
  assignment: string;
  rating: number;
  progress: boolean;
}
interface children {
  children: React.ReactNode
}

const CourseModule = ({ children }: children) => {
  return (
    <div className="flex flex-col justify-center bg-white ">
      <div className="flex overflow-hidden relative flex-col w-full min-h-[1024px] max-md:max-w-full ">
        {/* nav bar */}
        <div className=" shadow-lg shadow-black flex gap-5 justify-between px-16 py-7 w-full font-medium  bg-zinc-800 max-md:flex-wrap max-md:px-5 max-md:max-w-full fixed z-20 ">
          <div className=" text-md flex gap-5 justify-between my-auto  text-white max-md:flex-wrap">
            <a href="/">
              <div className="font-bold text-xl">Skill Forge</div>
            </a>
            <div>Theory Module </div>
            <div>Multiple-choice</div>
            <div>Code writing</div>
          </div>
          <div className="flex gap-2.5 text-sm whitespace-nowrap">
            <div className="grow justify-center px-6 py-4 text-black bg-white rounded-2xl max-md:px-5 text-xl">
              Get started{" "}
            </div>
            <div className="grow justify-center px-3 py-3.5 bg-red-500 rounded-2xl text-stone-300 text-xl">
              Test knowledge
            </div>
          </div>
        </div>
        <div className=" w-full max-md:max-w-full  mt-28 relative">
          <div className="flex max-md:flex-col max-md:gap-0  ">
            {/* Side bar  */}
            <div className="flex flex-col w-[20%] max-md:w-full h-screen z-30 fixed">
              <div className="flex relative flex-col grow items-start px-16 pt-9 pb-20 w-full text-xl font-medium text-white whitespace-nowrap border-t border-solid bg-zinc-800 border-neutral-500 max-md:px-5 max-md:max-w-full">
                {/* arrow icon  */}
                <div className="mt-7">Frontend dev</div>
              </div>
            </div>
            <div className=" flex flex-col w-[80%]  max-md:w-full">
              <div className="flex relative flex-col grow px-12 pt-16 w-full h-full bg-neutral-900 max-md:px-5 max-md:max-w-full  ml-[29.8rem]">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseModule;
