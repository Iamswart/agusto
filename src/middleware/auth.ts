import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import config from "../config/config";
import { authenticationError } from "../error";
import logger from "../logger";
import { JWTUser } from "../utils/jwt-user";


export const checkAdmin = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const user = response.locals.user as JWTUser;
  if (!user.isAdmin) {
    throw authenticationError("Access denied. User is not an admin");
  }

  next();
};


export const protect = asyncHandler(
  async (request: Request, response: Response, next: NextFunction) => {
    const token = getAuthToken(request);
    const decodedValue = decodeToken(token);
    response.locals.user = new JWTUser(decodedValue);
    logger.info(
      `User ${response.locals.user.id} accessed ${request.url} route`
    );
    next();
  }
);

function getAuthToken(request: Request) {
  let token = request.headers["authorization"];
  if (token?.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }
  if (!token) {
    throw authenticationError("Auth token is required");
  }
  return token;
}

function decodeToken(token: string) {
  try {
    const decodedToken = jwt.verify(token, config.jwtSecret as string);
    

    return decodedToken;
  } catch (error) {
    throw authenticationError("Error occured while validating token");
  }
}

export const apiKeyAuthMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const receivedApiKey = request.get("x-api-key");

  if (!receivedApiKey || receivedApiKey !== config.apiKey) {
    throw authenticationError("Unauthorized. API key is missing or invalid");
  }
  next();
};
