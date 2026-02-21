import { Request, Response, NextFunction } from "express";
import { TaskService } from "../services/task.service";
import { AuthRequest } from "../middlewares/auth.middleware";

const taskService = new TaskService();

export const assignTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, dueDate, studentId } = req.body;

    const task = await taskService.assignTask(
      title,
      description,
      dueDate,
      studentId
    );

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error: any) {
    next(error)
  }
};
export const getMyTasks = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const studentId = req.user!.userId;

    const tasks = await taskService.getStudentTasks(studentId);

    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error: any) {
   next(error)
  }
}

export const updateTaskStatus = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskId = req.params.taskId as string;
    const studentId = req.user!.userId;
    const { status } = req.body;

    const task = await taskService.updateTaskStatus(
      taskId,
      studentId,
      status
    );

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error: any) {
    next(error)
  }
};
