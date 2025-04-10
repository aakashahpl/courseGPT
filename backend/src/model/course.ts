import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
   
        title:String,
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
                material:{
                    type:String,
                    required:false,
                 
                }
            },
        ],
    
});

const courseModel = mongoose.model("course", courseSchema);

export default courseModel;
