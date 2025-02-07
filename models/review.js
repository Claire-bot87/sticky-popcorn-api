import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    
    content: {
        type: String,
        required: true
    },
    
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
      
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }]
}, {
    timestamps: true
})

export default mongoose.model("Reviews", reviewSchema)