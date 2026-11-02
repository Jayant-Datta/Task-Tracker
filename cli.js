import mongoose from "mongoose";
import connectDB from "./src/connectdb.js";
import taskModel from "./src/model/task.model.js";

const args = process.argv.slice(2);
const command = args[0];

async function main() {
    await connectDB();

    switch (command) {
        case "add": {
            const description = args[1];

            if (!description) {
                console.log("Please provide description");
                break;
            }
            const parsedDueDate = args[2] ? new Date(args[2]) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); 

                const task = await taskModel.create({
                    description: description,
                    duedate: parsedDueDate
                }); 
                console.log(`Task added successfully! (ID: ${task.id})`);
            
            break;
        }
        case "update": {
            const id = Number(args[1]);
            const newDescription = args[2];
            if (!id || !newDescription) {
                console.log("Usage: node cli.js update <id> <new_description>");
                break;
            }
            const result = await taskModel.updateOne({ id }, { $set: { description: newDescription } });
            if (!result.matchedCount) console.log("Task not found");
            else console.log(`Task ${id} updated successfully`);
            break;
        }
case "list":
        case "view": {
            
            await taskModel.updateMany(
                { status: "in-progress", duedate: { $lt: new Date() } },
                { $set: { status: "pending" } }
            );
            
            const filterStatus = args[1];
            let query = {};
            if (filterStatus === "completed" || filterStatus === "done") {
                query.status = "completed";
            } else if (filterStatus === "pending" || filterStatus === "todo") {
                query.status = "pending";
            } else if (filterStatus === "in-progress") {
                query.status = "in-progress";
            }
            const tasks = await taskModel.find(query);
            if (tasks.length === 0) {
                console.log("No tasks found");
            } else {
                tasks.forEach((task) => {
                    console.log(`[ID: ${task.id}] ${task.description} | Status: ${task.status} | Due: ${task.duedate.toISOString().split('T')[0]}`);
                });
            }
            break;
        }



        case "delete": {
            const deleteId = Number(args[1]); 
            const deleteTask = await taskModel.deleteOne({ id: deleteId });
            if (!deleteTask.deletedCount) {
                console.log("Task not found");
            } else {
                console.log("Task deleted");
            }
            break;
        }

        case "mark-done":
        case "complete": { 
            const id = Number(args[1]);
            if (!id) {
                console.log("Please provide task ID");
                break;
            }
            const result = await taskModel.updateOne({ id }, { $set: { status: "completed" } });
            if (!result.matchedCount) console.log("Task not found");
            else console.log(`Task ${id} marked as done`);
            break;
        }


        default:
            console.log("Available commands: add, update, delete, list, mark-in-progress, mark-done");
    }

    await mongoose.disconnect(); 
}

main(); 
