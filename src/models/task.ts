import { Schema, model, Document } from "mongoose";

interface ITaskDocument extends Document {
  title: string;
  description: string;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  user: Schema.Types.ObjectId;
  status: "Not Started" | "In Progress" | "Completed";
}

const taskSchema = new Schema<ITaskDocument>({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
  },
  description: {
    type: String,
    maxlength: 1024,
  },
  dueDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["Not Started", "In Progress", "Completed"],
    default: "Not Started",
  },
});

taskSchema.pre<ITaskDocument>("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const Task = model<ITaskDocument>("Task", taskSchema);

export default Task;
