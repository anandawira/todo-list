import ProjectController from "./ProjectController";
import { format } from "date-fns";
import swal from "sweetalert";

const DomController = (() => {
  const mainDom = document.querySelector("main");
  const renderProjects = () => {
    const projects = ProjectController.getProjects();
    projects.forEach((project, projectId) => {
      console.log(project);

      const cardDom = createCardProject();

      const cardHeaderDom = createCardHeader(project);
      cardDom.appendChild(cardHeaderDom);

      const cardContentDom = createCardContent(project);
      cardDom.appendChild(cardContentDom);

      const cardFooterDom = createCardFooter(projectId);
      cardDom.appendChild(cardFooterDom);

      mainDom.appendChild(cardDom);
    });
  };

  const createCardProject = () => {
    const dom = document.createElement("div");
    dom.classList.add("card", "project");
    return dom;
  };

  const createCardHeader = (project) => {
    const projectName = project.name;

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

    // Todos
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
    //

    // Add button

    const addDiv = document.createElement("div");
    addDiv.classList.add("add-todo");

    const addIcon = document.createElement("i");
    addIcon.classList.add("ph-plus-circle");

    addDiv.appendChild(addIcon);

    dom.appendChild(addDiv);

    //
    return dom;
  };

  const createCardFooter = (projectId) => {
    const dom = document.createElement("div");
    dom.classList.add("card-footer");
    dom.addEventListener("click", () => {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this project!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          ProjectController.removeProject(projectId);
          dom.parentElement.remove();
          swal("Poof! Your project has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your project is safe!");
        }
      });
    });

    const delIcon = document.createElement("i");
    delIcon.classList.add("ph-x");

    dom.appendChild(delIcon);
    return dom;
  };

  return {
    renderProjects,
    createCardProject,
    createCardHeader,
    createCardContent,
  };
})();

export default DomController;
