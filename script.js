// Initial static data
let todos = [
    { id: 1, title: "Promener le chien", completed: false },
    { id: 2, title: "Faire les courses", completed: false },
    { id: 3, title: "Chercher les enfants à l'école", completed: true },
    { id: 4, title: "Réserver le restaurant", completed: false },
    { id: 5, title: "Nettoyer le garage", completed: true }
];

// DOM elements
const todoList = document.getElementById('todoList');
const showCompleted = document.getElementById('showCompleted');
const showUncompleted = document.getElementById('showUncompleted');
const showAll = document.getElementById('showAll');

// Render todos
function renderTodos(todosToRender) {
    todoList.innerHTML = todosToRender.map(todo => `
        <tr class="${todo.completed ? 'bg-gray-100' : 'bg-white'}">
            <td class="py-4 px-6">${todo.id}</td>
            <td class="py-4 px-6 ${todo.completed ? 'text-gray-500' : ''}">${todo.title}</td>
            <td class="py-4 px-6 text-right">
                <label class="inline-flex items-center">
                    <input type="checkbox" 
                           class="form-checkbox h-5 w-5 text-blue-600" 
                           ${todo.completed ? 'checked' : ''}
                           onchange="toggleTodo(${todo.id})"
                    >
                    <span class="ml-2">${todo.completed ? 'terminée' : 'en cours'}</span>
                </label>
            </td>
        </tr>
    `).join('');
}

// Toggle todo status
function toggleTodo(id) {
    todos = todos.map(todo => 
        todo.id === id ? {...todo, completed: !todo.completed} : todo
    );
    renderTodos(todos);
}

// Filter handlers
showCompleted.addEventListener('click', () => {
    renderTodos(todos.filter(todo => todo.completed));
});

showUncompleted.addEventListener('click', () => {
    renderTodos(todos.filter(todo => !todo.completed));
});

showAll.addEventListener('click', () => {
    renderTodos(todos);
});

async function fetchTodos() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();
        todos = data;
        renderTodos(todos);
    } catch (error) {
        console.error('Error fetching todos:', error);
    }
}

renderTodos(todos);

fetchTodos();