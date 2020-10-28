import ProjectController from "./ProjectController";
import DomController from "./DomController";

console.log(ProjectController.getProjects());

const proj = ProjectController.getProjects();

DomController.renderProjects();
