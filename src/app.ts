import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route";
import studentRoutes from "./routes/student.route";
import taskRoutes from "./routes/task.route";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({success:true,message:"Student management running"})
});


app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/tasks", taskRoutes);

app.use(errorMiddleware);

export default app;
