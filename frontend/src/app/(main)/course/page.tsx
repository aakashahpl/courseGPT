'use client'
import axios from "axios";
import React, { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
const accessKey = '0R3dr0MM-2tQmxYR0vkH67l9qDB0k3jiY3GIROwQpMI';

// Function to search for images based on keywords
async function searchImages(query:any) {
  try {
    const response = await axios.get(`https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
}


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DivideCircle, ImageUp, Sparkles, SquareDashedBottomCode } from 'lucide-react';

const CourseCard: React.FC = ({ title, id, _id }) => {
  const router = useRouter()

  return (
    <div
      className="block rounded-lg shadow-secondary-1 bg-zinc-800 w-[25rem]">
      <div
        className="relative overflow-hidden bg-cover flex justify-center "
      >
        <div className=" text-neutral-700 ">
          <SquareDashedBottomCode size={300} strokeWidth={1} />
        </div>
      </div>
      <div className="p-6 text-surface  ">
        <h5 className="mb-2 text-xl font-medium leading-tight">{title}</h5>
        <p className="mb-4 text-base text-neutral-400">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <button
          onClick={() => router.push(`/course-content?id=${_id}`)}
          className="inline-block rounded bg-red-500/70 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
          data-twe-ripple-init
          data-twe-ripple-color="light">
          Start course
        </button>
      </div>
    </div>
  )
}

const CreateCourseModule: React.FC = ({ getCourseTitles }: { getCourseTitles: any }) => {
  const [courseName, setCourseName] = useState([]);
  let reqOptions = {
    url: `http://localhost:3001/course/save/${courseName}`,
    method: "POST",
  }

  const handleCreateCourse = async () => {
    let response = await axios.request(reqOptions);
    console.log(response.data)
    // Logic to create the course with the provided courseName
    console.log(`Creating course: ${courseName}`);
    // Reset the courseName field after creating the course
    getCourseTitles() // Fetch the updated list of courses after creating a new course
    setCourseName('');
  };





  return (
    <Dialog>
      <DialogTrigger>
        <div className="  h-[300px] w-[300px] justify-center items-center px-14 pt-28 text-2xl text-center text-white rounded-md aspect-square bg-zinc-800 max-md:px-5 max-md:mt-10">
          <div className=" flex flex-row">
            <span>
              <Sparkles size={40} className=' text-left' />
            </span>
            <span className=' text-neutral-300'>
              Create a new course
            </span>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <span className='text-2xl text-neutral-300'>
              Create a new course
            </span>
          </DialogTitle>
          <DialogDescription >
            <span className=' text-xl text-gray-400'>
              Enter the name of the course and click "Create" to proceed.
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center">
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="Enter course name"
            className="w-full px-4 py-2 my-4 text-neutral-300 border border-gray-700 rounded-md focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleCreateCourse}
            className="px-6 py-3 text-lg text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none"
          >
            Create
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};


const CourseModule: React.FC<{ title: string, id: string }> = ({ title, id }) => {
  const router = useRouter()
  return (
    <div
      onClick={() => router.push(`/course-content?id=${id}`)}
      className="h-[300px] w-[300px] justify-center items-center p-3  text-xl text-center  rounded-md aspect-square  max-md:px-5 bg-zinc-800 max-md:mt-10 border hover:border-neutral-400   ">
      <div className="h-[80%] w-full  mb-4 rounded-md bg-slate-800 relative " />
      <div className="flex flex-col justify-between h-[20%]">
        <div className="text-lg font-semibold text-gray-400">{title}</div>
      </div>
    </div>
  )
};

const Page = () => {
  const fetchCourseTitles = async () => {
    let reqOptions = {
      url: "http://localhost:3001/course/getAll",
      method: "GET",
    }
    let response = await axios.request(reqOptions);
    console.log(response.data);
    setCourseTitles(response.data)
  }
  useEffect(() => {
    fetchCourseTitles();
  }, [])
  const [courseTitles, setCourseTitles] = useState([]);

  return (
    <div className="bg-zinc-900 h-screen">
      <div className='text-white grid grid-cols-4 gap-y-10  '>
        {courseTitles.map((title, index) => (
          // <CourseModule key={index} title={title.title} id={title._id} />
          <CourseCard title={title.title} id={index} _id={title._id} />
        ))}
        <div className="h-[300px] w-[300px]">
          <CreateCourseModule getCourseTitles={fetchCourseTitles} />
        </div>
      </div>
    </div>
  );
};

export default Page;