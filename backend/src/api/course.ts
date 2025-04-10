import express from "express";
import courseModel from "../model/course";
import mongoose from "mongoose";
import { generateCourseModules } from "../middleware/gemini";
import { generateDetailedModules } from "../middleware/gemini";

const Router2 = express.Router();

Router2.post("/save/:prompt", generateCourseModules, async (req: any, res) => {
    try {
        // console.log(req.courseModules);
        const courseData = JSON.parse(req.courseModules);
        console.log(courseData.course);
        const courseDetails = courseData.course;



        const newCourse = new courseModel(
            courseDetails
        );
        const savedCourse = await newCourse.save();

        res.status(201).json(savedCourse);

    } catch (error: any) {
        console.log("error while creating course \n",error);

        res.json({ message: error.message })
    }
});

Router2.get("/getAll", async (req, res) => {
    try {
        const allCourses = await courseModel.find({}, { title: 1, _id: 1 });

        res.json(allCourses);

    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


Router2.get("/fetch/:_id", async (req, res) => {
    try {
        const courseId = req.params._id;


        if (!mongoose.isValidObjectId(courseId)) {
            return res.status(400).json({ error: "Invalid course ID" });
        }

        const course = await courseModel.findById(courseId);

        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        res.json(course);

    } catch (error) {
        console.error("Error fetching course:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


Router2.get("/detailedcourse", generateDetailedModules, (req, res) => {

    console.log("detailed course generated");
})



export default Router2;