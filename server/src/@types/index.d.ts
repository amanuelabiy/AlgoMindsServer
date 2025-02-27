import { User as PrismaUser } from "@prisma/client";
import { Request } from "express";

declare global {
  namespace Express {
    interface User extends PrismaUser {}
    interface Request {
      sessionId?: string;
    }
  }
}
