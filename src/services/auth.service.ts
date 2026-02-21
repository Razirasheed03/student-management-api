import { User } from "../models/user.model";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";

export class AuthService {
  async registerAdmin(
    name: string,
    email: string,
    password: string
  ) {
    const existing = await User.findOne({ email });
    if (existing) {
      throw new Error("Email already exists");
    }

    const hashed = await hashPassword(password);

    const admin = await User.create({
      name,
      email,
      password: hashed,
      role: "admin",
    });

    return admin;
  }

  async login(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = generateToken({
      userId: user._id.toString(),
      role: user.role,
    });

    return { token };
  }
}