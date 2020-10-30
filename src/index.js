import ProjectController from "./ProjectController";
import DomController from "./DomController";

const proj = ProjectController.getProjects();

DomController.renderProjects();
