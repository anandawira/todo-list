import DomController from './DomController';

DomController.renderProjects();

const modalForm = document.getElementById('modalForm');
const btnSave = document.getElementById('btnSave');
modalForm.addEventListener('submit', (e) => {
  e.preventDefault();
  btnSave.click();
});
