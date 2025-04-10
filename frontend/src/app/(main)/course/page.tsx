'use client'
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ImageUp, Sparkles, BookOpen, Plus, Loader2 } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const accessKey = process.env.NEXT_PUBLI_UNSPLASH_KEY;

// Function to search for images based on keywords
async function searchImages(query) {
  try {
    const response = await axios.get(`https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
}

const CourseCard = ({ title, id, _id }) => {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch a relevant image for the course
    const fetchImage = async () => {
      const searchTerm = title.split(' ')[0] || 'education';
      const images = await searchImages(searchTerm);
      if (images && images.length > 0) {
        setImageUrl(images[0].urls.regular);
      }
      setLoading(false);
    };
    
    fetchImage();
  }, [title]);

  return (
    <div className="overflow-hidden bg-zinc-800/60 border border-zinc-700 hover:border-zinc-500 transition-all duration-300 hover:shadow-lg hover:shadow-zinc-700/30 group rounded-lg">
      <div className="relative h-48 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-full bg-zinc-700/50">
            <Loader2 className="w-10 h-10 text-zinc-400 animate-spin" />
          </div>
        ) : imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-zinc-700 to-zinc-800">
            <BookOpen size={64} className="text-zinc-500" />
          </div>
        )}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-5 pb-3">
        <h3 className="text-xl font-semibold text-zinc-100 group-hover:text-white transition-colors">
          {title}
        </h3>
        <p className="text-zinc-400 text-sm mt-1 line-clamp-2">
          A comprehensive course designed to enhance your skills and knowledge in this subject area.
        </p>
      </div>
      
      <div className="px-5 pb-5">
        <Button 
          onClick={() => router.push(`/course-content?id=${_id}`)}
          className="w-full bg-red-600 hover:bg-red-700 text-white transition-all duration-300 font-medium"
        >
          Start Learning
        </Button>
      </div>
    </div>
  );
};

const CreateCourseModule = ({ getCourseTitles }) => {
  const [courseName, setCourseName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateCourse = async () => {
    if (!courseName.trim()) return;
    
    setIsSubmitting(true);
    try {
      let reqOptions = {
        url: `http://localhost:3001/course/save/${courseName}`,
        method: "POST",
      };
      await axios.request(reqOptions);
      getCourseTitles();
      setCourseName('');
    } catch (error) {
      console.error('Error creating course:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="h-full bg-gradient-to-br from-zinc-800 to-zinc-900 border border-dashed border-zinc-700 hover:border-zinc-500 cursor-pointer transition-all duration-300 flex flex-col items-center justify-center rounded-lg">
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <div className="bg-zinc-700/30 p-4 rounded-full mb-4">
              <Plus size={40} className="text-red-500" />
            </div>
            <h3 className="text-xl font-medium text-zinc-300">Create New Course</h3>
            <p className="text-zinc-500 mt-2">Add a new course to your collection</p>
          </div>
        </div>
      </DialogTrigger>
      
      <DialogContent className="bg-zinc-900 border-zinc-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-zinc-100 flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-red-500" />
            Create a New Course
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            Enter the name of your new course below to get started.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <Input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="Enter course name"
            className="bg-zinc-800 border-zinc-700 text-zinc-100 focus:border-red-500 focus:ring-red-500/20"
          />
        </div>
        
        <div className="flex justify-end">
          <Button
            onClick={handleCreateCourse}
            disabled={!courseName.trim() || isSubmitting}
            className="bg-red-600 hover:bg-red-700 text-white transition-all duration-300"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>Create Course</>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Page = () => {
  const [courseTitles, setCourseTitles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourseTitles = async () => {
    setLoading(true);
    try {
      let reqOptions = {
        url: "http://localhost:3001/course/getAll",
        method: "GET",
      };
      let response = await axios.request(reqOptions);
      setCourseTitles(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseTitles();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Your Courses</h1>
          <p className="text-zinc-400">Explore your existing courses or create a new one</p>
        </header>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-red-500 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courseTitles.map((course) => (
              <CourseCard 
                key={course._id} 
                title={course.title} 
                _id={course._id} 
              />
            ))}
            <CreateCourseModule getCourseTitles={fetchCourseTitles} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;