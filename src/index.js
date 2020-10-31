import ProjectController from "./ProjectController";
import DomController from "./DomController";

const proj = ProjectController.getProjects();

DomController.renderProjects();

const modalForm = document.getElementById("modalForm");
const btnSave = document.getElementById("btnSave");
modalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  btnSave.click();
});
