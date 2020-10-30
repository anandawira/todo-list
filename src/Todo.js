import { format } from "date-fns";

class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title || "";
    this.description = description || "";
    this.dueDate = dueDate || new Date();
    this.priority = priority || "low";
    this.isDone = false;
  }
}

export default Todo;
