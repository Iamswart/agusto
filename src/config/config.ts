import dotenv from "dotenv";

dotenv.config({});

export const VERSION = {
    v1: "/api/v1",
};

export default {
  mongo_uri: process.env.MONGO_URI,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiration: Number(process.env.JWT_EXPIRATION),
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  refreshTokenExpiration: Number(process.env.REFRESH_TOKEN_EXPIRATION),
  redisHostUrl: process.env.REDIS_URL,
  apiKey: process.env.API_KEY,
  awsAccessKey: process.env.AWS_ACCESS_KEY,
  awsSecretKey: process.env.AWS_SECRET_KEY,
  awsRegion: process.env.AWS_REGION,
  sqsUrl: process.env.SQS_QUEUE_URL,
  paystackSecretKey: process.env.PAYSTACK_SECRET_KEY,
  frontendUrl: process.env.FRONTEND_URL,
  termiiSecretKey: process.env.TERMII_SECRET_KEY,
  termiiSender: process.env.TERMII_SENDER,
  localServerUrl: process.env.LOCAL_SERVER_URL as string,
  productionServerUrl: process.env.PRODUCTION_SERVER_URL as string
};
