import mongoose, { Document, Schema } from "mongoose";

export type UserRole = "admin" | "student";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  department?: string;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "student"],
      required: true,
    },
    department: {
      type: String,
      required: function () {
        return this.role === "student";
      },
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);