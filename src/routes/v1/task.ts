import { celebrate } from "celebrate";
import { Request, Response, Router } from "express";
import asyncHandler from "express-async-handler";
import TaskController from "../../controller/task";
import { apiKeyAuthMiddleware, protect } from "../../middleware/auth";
import {
  createTaskSchema,
  updateTaskSchema,
  taskIdSchema,
} from "../../utils/validationSchema";
import { JWTUser } from "../../utils/jwt-user";

const taskRoutes: Router = Router();
const taskController = new TaskController();

taskRoutes.post(
  "/",
  apiKeyAuthMiddleware,
  protect,
  celebrate({ body: createTaskSchema }),
  asyncHandler(async (request: Request, response: Response) => {
    const user = response.locals.user as JWTUser;
    const taskData = request.body;
    const data = await taskController.createTask(taskData, user._id);

    response.status(201).json(data).end();
  })
);

taskRoutes.put(
  "/:taskId",
  apiKeyAuthMiddleware,
  protect,
  celebrate({ params: taskIdSchema, body: updateTaskSchema }),
  asyncHandler(async (request: Request, response: Response) => {
    const user = response.locals.user as JWTUser;
    const { taskId } = request.params;
    const taskData = request.body;
    const data = await taskController.updateTask(taskId, taskData, user._id);

    response.status(200).json(data).end();
  })
);

taskRoutes.delete(
  "/:taskId",
  apiKeyAuthMiddleware,
  protect,
  celebrate({ params: taskIdSchema }),
  asyncHandler(async (request: Request, response: Response) => {
    const user = response.locals.user as JWTUser;
    const { taskId } = request.params;
    const data = await taskController.deleteTask(taskId, user._id);

    response.status(200).json(data).end();
  })
);

taskRoutes.get(
  "/:taskId",
  apiKeyAuthMiddleware,
  protect,
  celebrate({ params: taskIdSchema }),
  asyncHandler(async (request: Request, response: Response) => {
    const user = response.locals.user as JWTUser;
    const { taskId } = request.params;
    const data = await taskController.getTask(taskId, user._id);

    response.status(200).json(data).end();
  })
);

taskRoutes.get(
  "/",
  apiKeyAuthMiddleware,
  protect,
  asyncHandler(async (request: Request, response: Response) => {
    const user = response.locals.user as JWTUser;
    const data = await taskController.getAllTasks(user._id);

    response.status(200).json(data).end();
  })
);

export { taskRoutes };
