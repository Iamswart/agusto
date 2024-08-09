namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    PORT: string;
    MONGO_URI: string;
    JWT_SECRET: string;
    JWT_EXPIRATION: string;
    REFRESH_TOKEN_SECRET: string;
    REFRESH_TOKEN_EXPIRATION: string;
    REDIS_URL: string;
    API_KEY: string;
    AWS_ACCESS_KEY: string;
    AWS_SECRET_KEY: string;
    AWS_REGION: string;
    SQS_QUEUE_URL: string;
    PAYSTACK_SECRET_KEY: string;
    FRONTEND_URL: string;
    TERMII_SECRET_KEY: string;
    TERMII_SENDER: string;
  }
}
