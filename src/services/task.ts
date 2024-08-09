import { unknownResourceError } from "../error";
import { CreateTaskInterface, UpdateTaskInterface } from "../interfaces/task";
import Task from "../models/task";
import User from "../models/user";

export default class TaskService {

  async createTask(input: CreateTaskInterface, userId: string) {
    const { title, description, dueDate, status } = input;

    const user = await User.findById(userId);
    if (!user) {
      throw unknownResourceError("User not found");
    }

    const task = new Task({
      title,
      description,
      dueDate,
      status,
      user: user._id,
    });

    await task.save();

    return task;
  }

  async updateTask(taskId: string, input: UpdateTaskInterface, userId: string) {
    const { title, description, dueDate, status } = input;

    const task = await Task.findOne({ _id: taskId, user: userId });
    if (!task) {
      throw unknownResourceError("Task not found");
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (dueDate) task.dueDate = dueDate;
    if (status) task.status = status;

    await task.save();

    return task;
  }

  async deleteTask(taskId: string, userId: string) {
    const task = await Task.findOneAndDelete({ _id: taskId, user: userId });
    if (!task) {
      throw unknownResourceError("Task not found");
    }

    return task;
  }

  async getTask(taskId: string, userId: string) {
    const task = await Task.findOne({ _id: taskId, user: userId });
    if (!task) {
      throw unknownResourceError("Task not found");
    }

    return task;
  }

  async getAllTasks(userId: string) {
    const tasks = await Task.find({ user: userId });
    return tasks;
  }
}
