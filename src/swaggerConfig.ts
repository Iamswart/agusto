import { OpenAPIV3 } from "openapi-types";
import config from "./config/config";

const swaggerDocument: OpenAPIV3.Document = {
  openapi: "3.0.0",
  info: {
    title: "Task Management API Documentation",
    version: "1.0.0",
    description: "This is the API documentation for the Task Management system.",
  },
  servers: [
    {
      url: config.localServerUrl,
      description: "Local server"
    },
    {
      url: config.productionServerUrl,
      description: "Production server"
    }
  ],
  paths: {
    "/auth/register": {
      post: {
        summary: "Register a new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Register",
              },
            },
          },
        },
        responses: {
          201: {
            description: "User registered successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/RegisterResponse",
                },
              },
            },
          },
          400: {
            description: "Invalid data",
          },
        },
      },
    },
    "/auth/login": {
      post: {
        summary: "Login a user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Login",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Login successful",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/LoginResponse",
                },
              },
            },
          },
          400: {
            description: "Invalid credentials",
          },
        },
      },
    },
    "/tasks": {
      post: {
        summary: "Create a new task",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CreateTask",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Task created successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Task",
                },
              },
            },
          },
          400: {
            description: "Invalid data",
          },
        },
      },
      get: {
        summary: "Get all tasks for a user",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Tasks retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Task",
                  },
                },
              },
            },
          },
        },
      },
    },
    "/tasks/{taskId}": {
      get: {
        summary: "Get a specific task by ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "taskId",
            in: "path",
            required: true,
            schema: {
              type: "string",
              format: "uuid",
            },
          },
        ],
        responses: {
          200: {
            description: "Task retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Task",
                },
              },
            },
          },
          404: {
            description: "Task not found",
          },
        },
      },
      put: {
        summary: "Update a task",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "taskId",
            in: "path",
            required: true,
            schema: {
              type: "string",
              format: "uuid",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UpdateTask",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Task updated successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Task",
                },
              },
            },
          },
          400: {
            description: "Invalid data",
          },
          404: {
            description: "Task not found",
          },
        },
      },
      delete: {
        summary: "Delete a task",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "taskId",
            in: "path",
            required: true,
            schema: {
              type: "string",
              format: "uuid",
            },
          },
        ],
        responses: {
          200: {
            description: "Task deleted successfully",
          },
          404: {
            description: "Task not found",
          },
        },
      },
    },
    "/auth/change-password": {
      post: {
        summary: "Change user's password",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ChangePassword",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Password changed successfully",
          },
          400: {
            description: "Invalid data",
          },
        },
      },
    },
    "/auth/forgot-password": {
      post: {
        summary: "Request password reset link",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ForgotPassword",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Password reset link sent successfully",
          },
          400: {
            description: "Invalid data",
          },
        },
      },
    },
    "/auth/reset-password": {
      post: {
        summary: "Reset password using reset token",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ResetPassword",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Password reset successfully",
          },
          400: {
            description: "Invalid data",
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Register: {
        type: "object",
        properties: {
          userName: {
            type: "string",
          },
          email: {
            type: "string",
            format: "email",
          },
          phone: {
            type: "string",
          },
          password: {
            type: "string",
          },
        },
        required: ["userName", "email", "phone", "password"],
      },
      Login: {
        type: "object",
        properties: {
          email: {
            type: "string",
            format: "email",
          },
          phone: {
            type: "string",
          },
          password: {
            type: "string",
          },
        },
        required: ["password"],
      },
      RegisterResponse: {
        type: "object",
        properties: {
          user: {
            type: "object",
            properties: {
              id: {
                type: "string",
              },
              userName: {
                type: "string",
              },
              email: {
                type: "string",
              },
            },
          },
          accessToken: {
            type: "string",
          },
          refreshToken: {
            type: "string",
          },
        },
      },
      LoginResponse: {
        type: "object",
        properties: {
          user: {
            type: "object",
            properties: {
              id: {
                type: "string",
              },
              userName: {
                type: "string",
              },
              email: {
                type: "string",
              },
            },
          },
          accessToken: {
            type: "string",
          },
          refreshToken: {
            type: "string",
          },
        },
      },
      Task: {
        type: "object",
        properties: {
          id: {
            type: "string",
          },
          title: {
            type: "string",
          },
          description: {
            type: "string",
          },
          dueDate: {
            type: "string",
            format: "date-time",
          },
          status: {
            type: "string",
            enum: ["Not Started", "In Progress", "Completed"],
          },
          createdAt: {
            type: "string",
            format: "date-time",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
          },
        },
      },
      CreateTask: {
        type: "object",
        properties: {
          title: {
            type: "string",
          },
          description: {
            type: "string",
          },
          dueDate: {
            type: "string",
            format: "date-time",
          },
          status: {
            type: "string",
            enum: ["Not Started", "In Progress", "Completed"],
          },
        },
        required: ["title"],
      },
      UpdateTask: {
        type: "object",
        properties: {
          title: {
            type: "string",
          },
          description: {
            type: "string",
          },
          dueDate: {
            type: "string",
            format: "date-time",
          },
          status: {
            type: "string",
            enum: ["Not Started", "In Progress", "Completed"],
          },
          completed: {
            type: "boolean",
          },
        },
      },
      ChangePassword: {
        type: "object",
        properties: {
          oldPassword: {
            type: "string",
          },
          newPassword: {
            type: "string",
          },
        },
        required: ["oldPassword", "newPassword"],
      },
      ForgotPassword: {
        type: "object",
        properties: {
          email: {
            type: "string",
            format: "email",
          },
        },
        required: ["email"],
      },
      ResetPassword: {
        type: "object",
        properties: {
          token: {
            type: "string",
          },
          newPassword: {
            type: "string",
          },
        },
        required: ["token", "newPassword"],
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

export default swaggerDocument;
