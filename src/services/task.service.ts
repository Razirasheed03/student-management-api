import { Task } from "../models/task.model";
import { User } from "../models/user.model";

export class TaskService {
  async assignTask(
    title: string,
    description: string,
    dueDate: string,
    studentId: string
  ) {
    const student = await User.findById(studentId);

    if (!student || student.role !== "student") {
      throw new Error("Student not found");
    }

    const task = await Task.create({
      title,
      description,
      dueDate: new Date(dueDate),
      student: studentId,
    });

    return task;
  }
  async getStudentTasks(studentId: string) {
  const tasks = await Task.find({ student: studentId });

  const now = new Date();

  const formattedTasks = tasks.map((task) => {
    const isOverdue =
      task.status !== "completed" && task.dueDate < now;

    return {
      _id: task._id,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      status: isOverdue ? "overdue" : task.status,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  });

  return formattedTasks;
}
async updateTaskStatus(
  taskId: string,
  studentId: string,
  status: "completed"
) {
  const task = await Task.findOne({
    _id: taskId,
    student: studentId,
  });

  if (!task) {
    throw new Error("Task not found");
  }

  task.status = status;
  await task.save();

  return task;
}
}