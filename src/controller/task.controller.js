import taskModel from "../model/task.model.js";

const addtask = async (req,res) =>{
    const {description, duedate} = req.body;
    
    if (!description || !duedate){
        return res.status(400).json({message : " Title and due date are required"});
    }
    const parsedDueDate = new Date(duedate);

    if(isNaN(parsedDueDate.getTime())){
        return res.status(400).json({message : " Please enter a valid due date"});
    }

    
    if (parsedDueDate < new Date()) {
        return res.status(400).json({ message: "Due date must be in the future" });
    }
    const task = await taskModel.create({ 
        description : description,
        duedate:parsedDueDate
    })

    return res.status(201).json({task})
}

const updatetask = async (req,res) =>{
    const {id} = req.body;
    
    if(!id){
        return res.status(400).json({message : " id is required"});
    }

    const task = await taskModel.updateOne({id:id},{$set: {status:"completed"}});
    if (!task.matchedCount) {
        return res.status(404).json({message:"Task not found"});
    }
    return res.status(200).json({message:"Task updated"});
}

const deletetask = async (req,res) => {
    const {id} = req.body;
    
    if(!id){
        return res.status(400).json({message : "Task id is required"});
    }

    const task = await taskModel.deleteOne({
        id:id
    })
    
    if (!task.deletedCount){
        return res.status(404).json({message:"Task not found"});
    }

    return res.status(200).json({message:"Task is successfully deleted"})
}

const ListAllTask = async (req,res) => {
    await taskModel.updateMany(
        {
            status:"in-progress",
            duedate:{$lt: new Date()}
        }, 
        {
            $set : {status:"pending"}
        }
    );
    const pendingTask =  await taskModel.find({status:"pending"});
    const inprogresstask = await taskModel.find({status:"in-progress"});
    const completedtask = await taskModel.find({status:"completed"})
    return res.status(200).json({
        pendingTask,
        inprogresstask,
        completedtask
    }); 
}

const ListPendingTask = async (req,res) => {
    await taskModel.updateMany(
        {
            status:"in-progress",
            duedate:{$lt: new Date()}
        }, 
        {
            $set : {status:"pending"}
        }
    );
    const AllTask =  await taskModel.find({status:"pending"});
    return res.status(200).json({AllTask}); 
}

const ListCompletedTask = async (req,res) => {
    const AllTask =  await taskModel.find({status:"completed"});
    return res.status(200).json({AllTask}); 
}

const ListInProgressTask = async (req,res) => {
        await taskModel.updateMany(
        {
            status:"in-progress",
            duedate:{$lt: new Date()}
        }, 
        {
            $set : {status:"pending"}
        }
    );
    const AllTask =  await taskModel.find({status:"in-progress"});
    return res.status(200).json({AllTask}); 
}

export default {addtask,updatetask,deletetask, ListAllTask,ListPendingTask,ListCompletedTask,ListInProgressTask};
