import { NextFunction, Request, Response } from "express";
import { StudentService } from "../services/student.service";

const studentService = new StudentService();

export const createStudent = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const { name, email, password, department } = req.body;

    const student = await studentService.createStudent(
      name,
      email,
      password,
      department
    );

    res.status(201).json({
      success: true,
      data: student,
    });
  } catch (error: any) {
   next(error)
  }
};