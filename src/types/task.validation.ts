import { z } from "zod";

export const assignTaskSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    dueDate: z.string().refine(
      (date) => !isNaN(Date.parse(date)),
      "Invalid date format"
    ),
    studentId: z.string().regex(
  /^[0-9a-fA-F]{24}$/,
  "Invalid student ID format"
),
  }),
});
export const updateTaskStatusSchema = z.object({
  params: z.object({
    taskId: z.string().regex(
      /^[0-9a-fA-F]{24}$/,
      "Invalid task ID format"
    ),
  }),
  body: z.object({
    status: z.literal("completed"),
  }),
});