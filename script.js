// Pointeurs sur les boutons et le tableau de listes
const todoList = document.getElementById('todoList');
const showCompleted = document.getElementById('showCompleted');
const showUncompleted = document.getElementById('showUncompleted');
const showAll = document.getElementById('showAll');

// Fonction qui genere un element de tableau pour chaque élément d'un json (id, titre, état)
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
                           onchange="toggleTodo(${todo.id})">
                    <span class="ml-2">${todo.completed ? 'terminée' : 'en cours'}</span>
                </label>
            </td>
        </tr>
    `).join('');
}

// Fonction qui modifie l'etat de la tâche lorsque l'input est coché/décoché
function toggleTodo(id) {
    todos = todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    renderTodos(todos);
}


// CLick sur les boutons
showCompleted.addEventListener('click', () => {
    renderTodos(todos.filter(todo => todo.completed));
});

showUncompleted.addEventListener('click', () => {
    renderTodos(todos.filter(todo => !todo.completed));
});

showAll.addEventListener('click', () => {
    renderTodos(todos);
});


// On va chercher la data de jsonplaceholder, que l'on rend dans renderTodos
async function fetchTodos() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();
        console.log(data);
        todos = data;
        renderTodos(todos);
    } catch (error) {
        console.error('Error fetching todos:', error);
    }
}

// On faut un simple appelle sur fetchTodos, puis les eventListeners gèrent le reste
fetchTodos();