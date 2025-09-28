import mongoose from "mongoose";
const todoSchema = mongoose.Schema({
    title:{
        type:String,
        require:true,
    },
    desc:{
        type:String,
        require:true,

    },
    priority:{
        type:Number,
        require:true,
    },
    catagory:{
        type:String,
        require:true,
    },
    status:{
        type:Boolean,
        require:true,
        default:false,  
    },  
    },{timestamps:true}
);

const Todo =mongoose.model("Todo",todoSchema);

export default Todo;