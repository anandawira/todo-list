import Todo from "./Todo";

const ProjectController = (() => {
  const sampleTodos = [
    new Todo(
      "Read a book",
      "Read a book for 25 minutes",
      Date(),
      "mid",
      "For better literation skill"
    ),
    new Todo(
      "Meditate",
      "Meditate for at least 5 minutes.",
      Date(),
      "high",
      "For clearer mind"
    ),
    new Todo(
      "Gym",
      "Hit the gym for at least 1 hour.",
      Date(),
      "low",
      "For bigger muscle."
    ),
  ];
  const sampleProjects = [
    {
      name: "Daily",
      todos: sampleTodos,
    },
  ];

  const saveProjects = (projects) => {
    localStorage.setItem("projects", JSON.stringify(projects));
  };

  const getProjects = () => {
    if (!localStorage.getItem("projects")) {
      saveProjects(sampleProjects);
    }
    return JSON.parse(localStorage.getItem("projects"));
  };

  const getProject = (projectId) => {
    const projects = getProjects();
    return projects[projectId];
  };

  const addProject = (project) => {
    const projects = getProjects();
    const index = projects.push(project) - 1;
    saveProjects(projects);
    return index;
  };

  const editProject = (projectId, projectName) => {
    const projects = getProjects();
    projects[projectId].name = projectName;
    saveProjects(projects);
  };

  const removeProject = (projectId) => {
    const projects = getProjects();
    projects.splice(projectId, 1);
    saveProjects(projects);
  };

  const getTodo = (projectId, todoId) => {
    const projects = getProjects();
    return projects[projectId].todos[todoId];
  };

  const addTodo = (projectId, todo) => {
    const projects = getProjects();
    const index = projects[projectId].todos.push(todo) - 1;
    saveProjects(projects);
    return index;
  };

  const editTodo = (projectId, todoId, todo) => {
    const projects = getProjects();
    projects[projectId].todos[todoId] = todo;
    saveProjects(projects);
  };

  const changeTodoStatus = (projectId, todoId) => {
    const projects = getProjects();
    const newStatus = !projects[projectId].todos[todoId].isDone;
    projects[projectId].todos[todoId].isDone = newStatus;
    saveProjects(projects);
    return newStatus;
  };

  const removeTodo = (projectId, todoId) => {
    const projects = getProjects();
    projects[projectId].todos.splice(todoId, 1);
    saveProjects(projects);
  };

  return {
    getProjects,
    getProject,
    addProject,
    editProject,
    removeProject,
    getTodo,
    addTodo,
    editTodo,
    changeTodoStatus,
    removeTodo,
  };
})();

//TODO : refactor the code for better efficiency.
//TODO : Create ui on figma.

export default ProjectController;
