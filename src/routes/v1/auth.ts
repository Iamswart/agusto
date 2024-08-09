import { celebrate } from "celebrate";
import { Request, Response, Router } from "express";
import asyncHandler from "express-async-handler";
import AuthController from "../../controller/auth";
import {
  apiKeyAuthMiddleware,
  protect,
} from "../../middleware/auth";
import { JWTUser } from "../../utils/jwt-user";
import {
  changePasswordSchema,
  forgotPasswordSchema,
  loginSchema,
  refreshTokenSchema,
  registerAccountSchema,
  resetPasswordSchema,
} from "../../utils/validationSchema";

const authRoutes: Router = Router();
const authController = new AuthController();

authRoutes.post(
  "/register", 
  apiKeyAuthMiddleware,
  celebrate({ body: registerAccountSchema }),
  asyncHandler(async (request: Request, response: Response) => {
    const userData = request.body;
    const data = await authController.registerUser(userData);

    response.status(201).json(data).end();
  })
);

authRoutes.post(
  "/login",
  apiKeyAuthMiddleware,
  celebrate({ body: loginSchema }),
  asyncHandler(async (request: Request, response: Response) => {
    const loginData = request.body;
    const data = await authController.loginUser(loginData);

    response.status(200).json(data).end();
  })
);


authRoutes.post(
  "/change-password",
  apiKeyAuthMiddleware,
  celebrate({ body: changePasswordSchema }),
  protect,
  asyncHandler(async (request: Request, response: Response) => {
    const userData = request.body;
    const user = response.locals.user as JWTUser;
    await authController.changePassword(userData, user._id);

    response
      .status(200)
      .json({
        status: "success",
        message: "Password changed successfully",
      })
      .end();
  })
);

authRoutes.post(
  "/forgot-password",
  apiKeyAuthMiddleware,
  celebrate({ body: forgotPasswordSchema }),
  asyncHandler(async (request: Request, response: Response) => {
    const { email } = request.body;
    const data = await authController.forgotPassword(email);

    response
      .status(200)
      .json({
        success: true,
        message: "Email Reset Link has been sent to provided email",
        data,
      })
      .end();
  })
);

authRoutes.post(
  "/reset-password",
  apiKeyAuthMiddleware,
  celebrate({ body: resetPasswordSchema }),
  asyncHandler(async (request: Request, response: Response) => {
    const {token, newPassword} = request.body;
    await authController.resetPassword(token, newPassword);

    response
      .status(200)
      .json({
        message: "Password has been reset successfully. Try logging in again.",
      })
      .end();
  })
);


authRoutes.post(
  "/refresh-token",
  apiKeyAuthMiddleware,
  celebrate({ body: refreshTokenSchema }),
  asyncHandler(async (request: Request, response: Response) => {
    const { refreshToken } = request.body;
    const data = await authController.refreshToken(refreshToken);
    response.status(200).json(data).end();
  })
);

export { authRoutes };
