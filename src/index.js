import ProjectController from "./ProjectController";
import DomController from "./DomController";

console.log(ProjectController.getProject(0));

const proj = ProjectController.getProjects();

DomController.renderProjects();
