import { Router } from "express";
import { authRoutes } from "./auth";
import { userRoutes } from "./user";
import { taskRoutes } from "./task";

const v1Routes: Router = Router();

v1Routes.use("/auth", authRoutes);
v1Routes.use("/user", userRoutes);
v1Routes.use("/task", taskRoutes);


export { v1Routes };
