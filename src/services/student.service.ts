import { User } from "../models/user.model";
import { hashPassword } from "../utils/hash";

export class StudentService {
  async createStudent(
    name: string,
    email: string,
    password: string,
    department: string
  ) {
    const existing = await User.findOne({ email });
    if (existing) {
      throw new Error("Email already exists");
    }

    const hashed = await hashPassword(password);

    const student = await User.create({
      name,
      email,
      password: hashed,
      role: "student",
      department,
    });

    const { password: _, ...safeStudent } = student.toObject();

    return safeStudent;
  }
}