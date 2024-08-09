import {
  ChangePasswordInterface,
  LoginInterface,
  RegisterInterface
} from "../interfaces/auth";
import logger from "../logger";
import AuthService from "../services/auth";

export default class AuthController {
  private authService = new AuthService();

  async registerUser(input: RegisterInterface) {
    try {
      return await this.authService.register(input);
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async loginUser(input: LoginInterface) {
    try {
      return await this.authService.login(input);
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }


  async changePassword(input: ChangePasswordInterface, userId: string) {
    try {
      return await this.authService.changePassword(input, userId);
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async forgotPassword(input: string) {
    try {
      return await this.authService.forgotPassword(input);
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }


  async resetPassword(token: string, newPassword: string) {
    try {
      return await this.authService.resetUserPassword(token, newPassword);
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async refreshToken(input: string) {
    try {
      return await this.authService.refreshTokenUser(input);
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}
