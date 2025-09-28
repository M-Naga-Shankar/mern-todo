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
        type:String,
        require:true,
    },
    category:{
        type:String,
        require:true,
    },
    due_Date:{
        type:String,
        require:true,
    },
    completed:{
        type:Boolean,
        default:false,  
    },  
    },{timestamps:true}
);

const Todo =mongoose.model("Todo",todoSchema);

export default Todo;