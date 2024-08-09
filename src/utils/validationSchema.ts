import { Joi } from "celebrate";

export const registerAccountSchema = Joi.object({
  userName: Joi.string().trim().required(),
  email: Joi.string().trim().email().lowercase().required(),
  phone: Joi.string()
    .trim()
    .pattern(/^[0-9]{11,}$/)
    .required()
    .min(7)
    .max(12),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/)
    .message(
      '"password" must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
});

export const loginSchema = Joi.object().keys({
  email: Joi.string().trim().email().lowercase(),
  phone: Joi.string()
    .trim()
    .pattern(/^[0-9]{11,}$/)
    .min(7)
    .max(12),
  password: Joi.string().required(),
});

export const changePasswordSchema = Joi.object().keys({
  oldPassword: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/)
    .message(
      '"password" must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .required(),
  newPassword: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/)
    .message(
      '"password" must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .required(),
});

export const forgotPasswordSchema = Joi.object().keys({
  email: Joi.string().trim().email().lowercase().required(),
});

export const resetPasswordSchema = Joi.object().keys({
  token: Joi.string().required(),
  newPassword: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/)
    .message(
      '"password" must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
});

export const verifyEmailSchema = Joi.object().keys({
  token: Joi.string()
    .required()
    .length(6)
    .regex(/^[0-9]+$/)
    .message("Invalid Token"),
});

export const verifyPhoneSchema = Joi.object().keys({
  token: Joi.string()
    .required()
    .length(4)
    .regex(/^[0-9]+$/)
    .message("Invalid Token"),
});


export const refreshTokenSchema = Joi.object().keys({
  refreshToken: Joi.string().required(),
});


export const createTaskSchema = Joi.object({
  title: Joi.string().min(1).max(255).required(),
  description: Joi.string().max(1024).optional(),
  dueDate: Joi.date().optional(),
  status: Joi.string().valid("Not Started", "In Progress", "Completed").optional(),
});

export const updateTaskSchema = Joi.object({
  title: Joi.string().min(1).max(255).optional(),
  description: Joi.string().max(1024).optional(),
  dueDate: Joi.date().optional(),
  status: Joi.string().valid("Not Started", "In Progress", "Completed").optional(),
});

export const taskIdSchema = Joi.object({
  taskId: Joi.string().required(),
});