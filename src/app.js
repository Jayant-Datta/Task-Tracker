import express from "express";
import taskController from "./controller/task.controller.js";

const app = express();
app.use(express.json());

app.post("/addtask",taskController.addtask);
app.patch("/updatetask",taskController.updatetask);
app.delete("/deletetask", taskController.deletetask);
app.get("/ListAllTask",taskController.ListAllTask);
app.get("/ListPendingTask",taskController.ListPendingTask);
app.get("/ListCompletedTask",taskController.ListCompletedTask);
app.get("/ListInProgressTask",taskController.ListInProgressTask);

export default app;
