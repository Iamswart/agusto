import {
  CreateTaskInterface,
  UpdateTaskInterface,
} from "../interfaces/task";
import logger from "../logger";
import TaskService from "../services/task";

export default class TaskController {
  private taskService = new TaskService();

  async createTask(input: CreateTaskInterface, userId: string) {
    try {
      return await this.taskService.createTask(input, userId);
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async updateTask(taskId: string, input: UpdateTaskInterface, userId: string) {
    try {
      return await this.taskService.updateTask(taskId, input, userId);
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async deleteTask(taskId: string, userId: string) {
    try {
      return await this.taskService.deleteTask(taskId, userId);
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async getTask(taskId: string, userId: string) {
    try {
      return await this.taskService.getTask(taskId, userId);
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async getAllTasks(userId: string) {
    try {
      return await this.taskService.getAllTasks(userId);
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}
