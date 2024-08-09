import { celebrate } from "celebrate";
import { Request, Response, Router } from "express";
import asyncHandler from "express-async-handler";
import UserController from "../../controller/user";
import { apiKeyAuthMiddleware, protect, checkAdmin } from "../../middleware/auth";
import { JWTUser } from "../../utils/jwt-user";
import {
  verifyPhoneSchema,
} from "../../utils/validationSchema";


const userRoutes: Router = Router();
const userController = new UserController();

userRoutes.get(
  "/send-email-verification-link",
  apiKeyAuthMiddleware,
  protect,
  asyncHandler(async (request: Request, response: Response) => {
    const user = response.locals.user as JWTUser;
    const data = await userController.sendEmailVerificationLink(user._id);
    response
      .status(200)
      .json({
        success: true,
        message: "Email verification Link sent",
        data,
      })
      .end();
  })
);

userRoutes.get(
  "/verify-email",
  apiKeyAuthMiddleware,
  asyncHandler(async (request: Request, response: Response) => {
   
    const data = await userController.verifyEmail(request);

    response
      .status(200)
      .json({
        success: true,
        message: "Email verified successfully",
        data,
        
      })
      .end();
  })
);


userRoutes.get(
  "/send-phone-verification-code",
  apiKeyAuthMiddleware,
  protect,
  asyncHandler(async (request: Request, response: Response) => {
    const user = response.locals.user as JWTUser;
    const data = await userController.sendPhoneVerificationCode(user._id);
    response
      .status(200)
      .json({
        success: true,
        message: "Phone Number verification Code sent",
        data,
      })
      .end();
  })
);


userRoutes.post(
  "/verify-phone",
  apiKeyAuthMiddleware,
  celebrate({ body: verifyPhoneSchema }),
  protect,
  asyncHandler(async (request: Request, response: Response) => {
    const user = response.locals.user as JWTUser;
    const { token } = request.body;
    await userController.verifyPhone(user._id, token);
    response
      .status(200)
      .json({
        success: true,
        message: "Phone verified Successfully",
      })
      .end();
  })
);



export { userRoutes };
