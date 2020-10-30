import Todo from "./Todo";

const ProjectController = (() => {
  const sampleTodos = [
    new Todo("Read a book", "Read a book for 25 minutes", Date(), "mid"),
    new Todo("Meditate", "Meditate for at least 5 minutes.", Date(), "high"),
    new Todo("Gym", "Hit the gym for at least 1 hour.", Date(), "low"),
  ];

  const sampleProjects = new Map();
  sampleProjects.set("default", {
    name: "Daily",
    todos: sampleTodos,
  });

  const saveProjects = (projects) => {
    localStorage.setItem("projects", JSON.stringify([...projects])); //Using array of pair for converting to json
  };

  const getProjects = () => {
    if (!localStorage.getItem("projects")) {
      saveProjects(sampleProjects);
    }
    return new Map(JSON.parse(localStorage.getItem("projects"))); // Converting back to map
  };

  const getProject = (projectId) => {
    const projects = getProjects();
    return projects.get(projectId);
  };

  const addProject = (project) => {
    const projects = getProjects();
    const index = Date.now();
    projects.set(index, project);
    saveProjects(projects);
    return index;
  };

  const editProject = (projectId, projectName) => {
    const projects = getProjects();

    const project = projects.get(projectId);
    project.name = projectName;

    projects.set(projectId, project);
    saveProjects(projects);
  };

  const removeProject = (projectId) => {
    const projects = getProjects();
    projects.delete(projectId);
    saveProjects(projects);
  };

  const getTodo = (projectId, todoId) => {
    const projects = getProjects();
    const project = projects.get(projectId);
    return project.todos[todoId];
  };

  const addTodo = (projectId, todo) => {
    const projects = getProjects();
    const index = projects.get(projectId).todos.push(todo) - 1;
    saveProjects(projects);
    return index;
  };

  const editTodo = (projectId, todoId, todo) => {
    const projects = getProjects();
    projects.get(projectId).todos[todoId] = todo;
    saveProjects(projects);
  };

  const changeTodoStatus = (projectId, todoId) => {
    const projects = getProjects();
    const newStatus = !projects.get(projectId).todos[todoId].isDone;
    projects.get(projectId).todos[todoId].isDone = newStatus;
    saveProjects(projects);
    return newStatus;
  };

  const getTodoStatus = (projectId, todoId) => {
    const projects = getProjects();
    return projects.get(projectId).todos[todoId].isDone;
  };

  const removeTodo = (projectId, todoId) => {
    const projects = getProjects();
    projects.get(projectId).todos.splice(todoId, 1);
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
    getTodoStatus,
  };
})();

//TODO : refactor the code for better efficiency.
//TODO : Create ui on figma.

export default ProjectController;
