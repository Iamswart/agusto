export interface CreateTaskInterface {
    title: string;
    description?: string;
    dueDate?: Date;
    status?: "Not Started" | "In Progress" | "Completed";
  }
  
  export interface UpdateTaskInterface {
    title?: string;
    description?: string;
    dueDate?: Date;
    status?: "Not Started" | "In Progress" | "Completed";
  }