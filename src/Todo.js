class Todo {
  constructor(title, description, dueDate, priority, status) {
    this.title = title || '';
    this.description = description || '';
    this.dueDate = dueDate || new Date();
    this.priority = priority || 'low';
    this.isDone = false || status;
  }
}

export default Todo;
