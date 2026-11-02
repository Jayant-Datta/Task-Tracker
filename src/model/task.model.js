import mongoose from "mongoose";


const taskSchema = new mongoose.Schema({
    id:{
        type:Number,
        unique:true
    },
    description :{
        type:String,
        required:true,
        maxLength:100
    },
    duedate:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        enum:["pending","completed","in-progress"],
        default:"in-progress"
    }
},
{ 
    timestamps:true
});


taskSchema.pre('save', async function () {
    if (this.isNew) {
        const lastTask = await mongoose.model("Task").findOne().sort({ id: -1 });
        this.id = (lastTask && typeof lastTask.id === 'number') ? lastTask.id + 1 : 1;
    }
}); 

const taskModel = mongoose.model("Task",taskSchema);

export default taskModel;