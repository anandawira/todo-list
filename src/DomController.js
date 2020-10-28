import ProjectController from "./ProjectController";
import { format } from "date-fns";

const DomController = (() => {
  const renderProjects = () => {
    const projects = ProjectController.getProjects();
    projects.forEach((project) => {
      console.log(project);
    });
  };

  const createCardProject = () => {
    const dom = document.createElement("div");
    dom.classList.add("card", "project");
    return dom;
  };

  const createCardHeader = (projectName) => {
    const dom = document.createElement("div");
    dom.classList.add("card-header");

    const pElement = document.createElement("p");

    const inputElement = document.createElement("input");
    inputElement.classList.add("project-name");
    inputElement.type = "text";
    inputElement.setAttribute("value", projectName);

    pElement.appendChild(inputElement);
    dom.appendChild(pElement);
    return dom;
  };

  const createCardContent = (project) => {
    const dom = document.createElement("div");
    dom.classList.add("card-content");

    const todos = project.todos;
    todos.forEach((todo) => {
      const priority = todo.priority + "-priority";
      const dueDate = new Date(todo.dueDate);
      const dueDateFormatted = format(dueDate, "dd MMM");
      const todoTitle = todo.title;

      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo", priority);

      const titleDiv = document.createElement("div");
      titleDiv.classList.add("todo-title");

      const pElement = document.createElement("p");
      pElement.innerText = todoTitle;

      const editIcon = document.createElement("i");
      editIcon.classList.add("ph-pencil-simple");

      titleDiv.appendChild(pElement);
      titleDiv.appendChild(editIcon);
      todoDiv.appendChild(titleDiv);

      const dueDateDiv = document.createElement("div");
      dueDateDiv.classList.add("due-date");

      const pDueDate = document.createElement("p");
      pDueDate.innerText = dueDateFormatted;

      dueDateDiv.appendChild(pDueDate);
      todoDiv.appendChild(dueDateDiv);

      dom.appendChild(todoDiv);
    });
    return dom
  };

  return {
    renderProjects,
    createCardProject,
    createCardHeader,
    createCardContent
  };
})();

export default DomController;
