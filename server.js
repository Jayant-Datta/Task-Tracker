import app from "./src/app.js";
import connectDB from "./src/connectdb.js";

await connectDB();

app.listen(3000, ()=>{
    console.log("Server is runing at port 3000");
})


      