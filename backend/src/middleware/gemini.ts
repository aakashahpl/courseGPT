import { GoogleGenerativeAI } from "@google/generative-ai";
import courseModel from "../model/course";

export async function generateCourseModules(req: any, res: any, next: any) {
    try {
        const geminiKey = process.env.GEMINI_KEY;
        if (!geminiKey) {
            throw new Error("GEMINI_KEY is not defined in environment variables");
        }
        const genAI = new GoogleGenerativeAI(
            geminiKey 
        );
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        const prompt = `${req.params.prompt}. suggest multiple modules on the Course along with the estimated time required to complete the course. Start with the basics first. Return me the output in JSON in the following format.
        course: 
        {
           title:{
               type:String,
               
           },
           modules: [
               {
                   title: {
                       type: String,
                       required: true,
                   },
                   description: {
                       type: String,
                       required: true,
                   },
                   timeRequired: {
                       type: String,
                       required: true,
                   },
               },
               ...MORE_MODULES
           ],
       },`;

        const result: any = await model.generateContent(prompt);
        const response = await result.response;
        console.log(response);
        const text = response.text();
        const jsonWithoutBackticks = text.replace(/^```json|```$/g, "");

        req.courseModules = jsonWithoutBackticks;

        next();
    } catch (error) {
        console.error("Error generating course modules:", error);
        next(error);
    }
}

export async function generateDetailedModules(req: any, res: any, next: any) {
    try {
        const courseId = req.query._id;
        const moduleNumber = req.query.module_number;

        const geminiKey = process.env.GEMINI_KEY;
        if (!geminiKey) {
            throw new Error("GEMINI_KEY is not defined in environment variables");
        }
        if (!courseId || !moduleNumber) {
            return res
                .status(400)
                .json({ error: "Course ID and module number are required" });
        }
        const course = await courseModel.findById(courseId);

        const genAI = new GoogleGenerativeAI(
            geminiKey
        );
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        if (course === null) {
            return;
        }

        const prompt = `*Instructions*

            1. *User Input:* I will provide the following:
               * *topic:*  The specific data structure or algorithm to teach
               * *language:* The programming language for examples and implementations
            
            2. *Structure:* Generate course content in JSON...  Ensure you provide minimum four content sections and one quiz per section. Include small code examples where-ever possible. Focus on these core subtopics:
               * Introduction to <topic>
               * Key concepts or techniques within <topic>
               * Very short code examples for the <topic> in <language>
               * Advanced topics within <topic> (if applicable)
            
                                              
              json
              {
                "<topic> in <language>": [
                  {
                    "content": "Textual explanation of a concept (one or more paragraphs)",
                    "quiz": [
                      {
                        "question": "Multiple-choice question about the concept",
                        "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
                        "correct": "The single correct answer"
                      }
                    ],
                    "code_example": [
                      "code line 1",
                      "code line 2",
                    ]
                  }
                   /* More content sections as needed */
                ]
              }
              
              
              *User Input*
              * *topic:* ${course.modules[moduleNumber].description}
              * *language:* decided by gemini
              `;

        const result: any = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        // console.log(text);
        const jsonWithoutBackticks = text.replace(/^```json|```$/g, "");
        // course.modules[moduleNumber].material = jsonWithoutBackticks;
        // console.log(jsonWithoutBackticks);
        const parsedData = JSON.parse(jsonWithoutBackticks);
        console.log(parsedData);
        res.status(200).json(parsedData);
        // res.status(200).json(course.modules[moduleNumber].material);


        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("Error generating course modules:", error);
        next(error); // Pass the error to Express error handling
    }
}






