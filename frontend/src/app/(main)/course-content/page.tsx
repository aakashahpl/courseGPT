'use client'
import { Skeleton } from "@/components/ui/skeleton";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { Atom } from "lucide-react";

interface CourseModuleProps {
  title: string;
  description: string;
  time: string
  index: string
  _id: string
}

const CourseModule: React.FC<CourseModuleProps> = ({
  title,
  description,
  time,
  index,
  _id
}) => {

  const router = useRouter()
  return (
    <div className=" px-4 py-4 rounded-xl bg-zinc-800 max-md:max-w-full mb-12 w-[80%] h-[20.7rem]" >
      <div className=" justify-start flex max-md:flex-col ">
        <div className=" absolute text-neutral-400">
          <Atom size={300} strokeWidth={1} />
        </div>
        {/* image  */}
        <div className="  shrink-0  rounded-xl  bg-zinc-500 w-[300px] h-[300px]  " />
        {/* text and button */}
        <div className="  flex flex-col ml-5  max-md:ml-0 max-md:w-full w-full">
          <div className=" flex flex-col justify-between grow whitespace-nowrap max-md:mt-8 max-md:max-w-full">
            {/* top sec  */}
            <div className="  flex gap-5 justify-between items-start px-0.5 w-full text-white max-md:flex-wrap ">
              <div className="flex flex-col mt-2 text-sm  max-w-[40%] text-wrap">
                <div className="font-medium text-2xl text-neutral-100">{title}</div>
                <div className=" text-[1rem]">
                  <div className="mt-4 text-neutral-300">{description}</div>
                </div>
              </div>
              {/* quiz section */}
              <div className="flex gap-1.5 text-base font-medium ">
                <div className="grow my-auto">Time required to complete</div>
                <div className="grow justify-center px-4 py-2 bg-red-500 rounded-2xl text-xl ">
                  {time} <span>Hours</span>
                </div>
              </div>
            </div>
            {/* bottom  */}

            <div className="  flex gap-5 justify-between px-px text-sm font-medium max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
              <div className=" text-xl justify-center self-start px-6 py-2.5 text-black rounded-full bg-zinc-300 max-md:px-5">
                Progress
              </div>
              <div
                onClick={() => { router.push(`/blog?_id=${_id}&module_number=${index}`) }}
                className=" cursor-pointer text-xl justify-center items-center px-16 py-3 text-white bg-red-500 rounded-3xl max-md:px-5">
                Start topic
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const App: React.FC = () => {

  const [courseModule, setCourseModules] = React.useState<CourseModuleProps[]>([])
  const searchPrama = useSearchParams();
  const id_ = searchPrama.get('id')
  console.log("id " + id_)

  React.useEffect(() => {
    const fetchData = async () => {
      let reqOptions = {
        url: `http://localhost:3001/course/fetch/${id_}`,
        method: "GET",
      }
      let response = await axios.request(reqOptions);
      console.log(response.data);
      setCourseModules(response.data)
    }
    fetchData()
  }, [])

  if (courseModule.length === 0) {
    return <div>
      <Skeleton className="w-[80%] h-[20.7rem] rounded-xl mb-12 " />
      <Skeleton className="w-[80%] h-[20.7rem] rounded-xl mb-12 " />
      <Skeleton className="w-[80%] h-[20.7rem] rounded-xl mb-12 " />
    </div>
  }

  return (
    <div>
      {
        courseModule.modules.map((module, index) => (
          <CourseModule
            key={index}
            _id={id_}
            index={index}
            title={module.title}
            description={module.description}
            time={module.timeRequired}
          />
        ))
      }
    </div >
  );
};

export default App;