import jwt from "jsonwebtoken";

export interface JwtPayload {
    userId: string;
    role: "admin" | "student";
}

export const generateToken = (payload: JwtPayload): string => {
    return jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: "1d",
    });
};

export const verifyToken = (token: string): JwtPayload => {
    return jwt.verify(
        token,
        process.env.JWT_SECRET as string
    ) as JwtPayload;
};