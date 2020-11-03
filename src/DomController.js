/* eslint-disable no-undef */
import { format } from 'date-fns';
import swal from 'sweetalert';
import ProjectController from './ProjectController';
import Todo from './Todo';

const DomController = (() => {
  const mainDom = document.querySelector('main');

  const createCardProject = () => {
    const dom = document.createElement('div');
    dom.classList.add('card', 'project');
    return dom;
  };

  const createCardHeader = (project, projectId) => {
    const projectName = project.name;

    const dom = document.createElement('div');
    dom.classList.add('card-header');

    const pElement = document.createElement('p');

    const inputElement = document.createElement('input');
    inputElement.classList.add('project-name');
    inputElement.type = 'text';
    inputElement.setAttribute('value', projectName);

    inputElement.addEventListener('focusout', (e) => {
      ProjectController.editProject(projectId, e.target.value);
    });

    pElement.appendChild(inputElement);
    dom.appendChild(pElement);
    return dom;
  };

  const editModal = (title, description, dueDate, priority) => {
    const todayDate = format(Date.now(), 'yyyy-MM-dd');

    document.getElementById('inputTitle').value = title || '';
    document.getElementById('inputDescription').value = description || '';
    document.getElementById('inputDuedate').value = dueDate || todayDate;
    document.getElementById('priority').value = priority || 'high';
  };

  const createTodoItem = (todo, todoId, projectId) => {
    const priorityClass = `${todo.priority}-priority`;
    const dueDate = new Date(todo.dueDate);
    const dueDateFormatted = format(dueDate, 'dd MMM');
    const todoTitle = todo.title;

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo', priorityClass);
    if (ProjectController.getTodoStatus(projectId, todoId)) {
      todoDiv.classList.add('done');
    }

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('todo-title');

    const pElement = document.createElement('p');
    pElement.innerText = todoTitle;

    const editIcon = document.createElement('i');
    editIcon.classList.add('ph-pencil-simple');
    editIcon.addEventListener('click', () => {
      const { title } = todo;
      const desc = todo.description;
      const dueDateValue = format(new Date(todo.dueDate), 'yyyy-MM-dd');
      const { priority } = todo;

      editModal(title, desc, dueDateValue, priority);
      $('#detail').modal({
        fadeDuration: 200,
      });
      document.getElementById('inputTitle').focus();

      const saveButton = document.getElementById('btnSave');

      const editFunction = () => {
        saveButton.removeEventListener('click', editFunction);
        const titleVal = document.getElementById('inputTitle').value;
        const descVal = document.getElementById('inputDescription').value;
        const dueDateVal = new Date(
          document.getElementById('inputDuedate').value,
        );
        const priorityVal = document.getElementById('priority').value;
        const statusVal = ProjectController.getTodoStatus(projectId, todoId);

        const newTodo = new Todo(
          titleVal,
          descVal,
          dueDateVal,
          priorityVal,
          statusVal,
        );

        ProjectController.editTodo(projectId, todoId, newTodo);

        $.modal.close();

        const newDom = createTodoItem(todo, todoId, projectId);
        if (statusVal) {
          newDom.classList.add('done');
        }
        todoDiv.replaceWith(newDom);
      };

      saveButton.addEventListener('click', editFunction);
    });

    const doneIcon = document.createElement('i');
    doneIcon.classList.add('ph-check');

    doneIcon.addEventListener('click', () => {
      todoDiv.classList.toggle('done');
      ProjectController.changeTodoStatus(projectId, todoId);
    });

    titleDiv.appendChild(pElement);
    titleDiv.appendChild(editIcon);
    titleDiv.appendChild(doneIcon);
    todoDiv.appendChild(titleDiv);

    const dueDateDiv = document.createElement('div');
    dueDateDiv.classList.add('due-date');

    const pDueDate = document.createElement('p');
    pDueDate.innerText = dueDateFormatted;

    dueDateDiv.appendChild(pDueDate);
    todoDiv.appendChild(dueDateDiv);
    return todoDiv;
  };

  const createCardContent = (project, projectId) => {
    const dom = document.createElement('div');
    dom.classList.add('card-content');

    // Todos
    const { todos } = project;
    todos.forEach((todo, todoId) => {
      const todoDiv = createTodoItem(todo, todoId, projectId);
      dom.appendChild(todoDiv);
    });
    //

    // Add button

    const addDiv = document.createElement('div');
    addDiv.classList.add('add-todo');

    const addIcon = document.createElement('i');
    addIcon.classList.add('ph-plus-circle');
    addIcon.addEventListener('click', () => {
      editModal();
      $('#detail').modal({
        fadeDuration: 200,
      });
      document.getElementById('inputTitle').focus();

      const saveButton = document.getElementById('btnSave');

      const addFunction = () => {
        saveButton.removeEventListener('click', addFunction);
        const title = document.getElementById('inputTitle').value;
        const desc = document.getElementById('inputDescription').value;
        const dueDate = new Date(document.getElementById('inputDuedate').value);
        const priority = document.getElementById('priority').value;

        const todo = new Todo(title, desc, dueDate, priority);

        // Add todo to localstorage and get todoId as return
        const todoId = ProjectController.addTodo(projectId, todo);
        const todoDom = createTodoItem(todo, todoId, projectId);

        dom.insertBefore(todoDom, addDiv);
        $.modal.close();
      };
      saveButton.addEventListener('click', addFunction);
    });

    addDiv.appendChild(addIcon);

    dom.appendChild(addDiv);

    //
    return dom;
  };

  const createCardFooter = (projectId) => {
    const dom = document.createElement('div');
    dom.classList.add('card-footer');
    dom.addEventListener('click', () => {
      swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this project!',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          ProjectController.removeProject(projectId);
          dom.parentElement.remove();
          swal('Poof! Your project has been deleted!', {
            icon: 'success',
          });
        } else {
          swal('Your project is safe!');
        }
      });
    });

    const delIcon = document.createElement('i');
    delIcon.classList.add('ph-x');

    dom.appendChild(delIcon);
    return dom;
  };

  const createCard = (project, projectId) => {
    const cardDom = createCardProject();

    const cardHeaderDom = createCardHeader(project, projectId);
    cardDom.appendChild(cardHeaderDom);

    const cardContentDom = createCardContent(project, projectId);
    cardDom.appendChild(cardContentDom);

    const cardFooterDom = createCardFooter(projectId);
    cardDom.appendChild(cardFooterDom);

    const cardAdd = document.querySelector('.card.new');
    mainDom.insertBefore(cardDom, cardAdd);
  };

  const createCardAddNew = () => {
    const dom = document.createElement('div');
    dom.classList.add('card', 'new');
    dom.addEventListener('click', () => {
      const blankProj = {
        name: 'New Project',
        todos: [],
      };
      // Add blank project to localstorage and get index as return.
      const projectId = ProjectController.addProject(blankProj);
      createCard(blankProj, projectId);
    });

    const addButton = document.createElement('div');
    addButton.id = 'add-project';

    const plusIcon = document.createElement('i');
    plusIcon.classList.add('ph-plus');

    addButton.appendChild(plusIcon);
    dom.appendChild(addButton);
    return dom;
  };

  const renderProjects = () => {
    const cardAdd = createCardAddNew();
    mainDom.appendChild(cardAdd);

    const projects = ProjectController.getProjects();
    projects.forEach((project, projectId) => {
      createCard(project, projectId);
    });

    const marginRight = document.createElement('p'); // Added a transparent p on the right because the last card right margin wont show
    marginRight.style = 'opacity: 0%';
    marginRight.innerText = '.';
    mainDom.appendChild(marginRight);
  };

  return {
    renderProjects,
    createCardProject,
    createCardHeader,
    createCardContent,
  };
})();

export default DomController;
