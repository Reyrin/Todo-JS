const main = (document => {
    function createElement(tag, props, ...children) {
        const element = document.createElement(tag);
    
        Object.keys(props).forEach(key => element[key] = props[key]);
    
        if (children.length > 0) {
            children.forEach(child => {
                if (typeof child === 'string') {
                    child = document.createTextNode(child)
                }
                element.appendChild(child);
            })
        }
        
        return element;
    }
    
    function createTodoItem(title) {
        // проще было бы использовать innerHTML но у него плохая поддержка(хз как сейчас)
        const checkbox = createElement('input', {type: 'checkbox', className: 'checkbox'});
        const label = createElement('label', {className: 'title'}, title);
        const editInput = createElement('input', {type: 'text', className: 'textfield'});
        const editBtn = createElement('button', {className: 'edit'}, 'Изменить');
        const deleteBtn = createElement('button', {className: 'delete'}, 'Удалить');
        const listItem = createElement('li', {className: 'todo-item'}, checkbox, label, editInput, editBtn, deleteBtn);
    
        bindEvents(listItem);
    
        return listItem;
    }
    
    function bindEvents(todoItem) {
        const checkbox = todoItem.querySelector('.checkbox');
        const editBtn = todoItem.querySelector('button.edit');
        const deleteBtn = todoItem.querySelector('button.delete');
    
        checkbox.addEventListener('change', toggleTodoItem);
        editBtn.addEventListener('click', editTodoItem);
        deleteBtn.addEventListener('click', deleteTodoItem);
    }
    
    function addTodoItem(event) {
        event.preventDefault();
    
        if (addInput.value === '') return alert('Необходимо ввести название задачи.');
    
        const todoItem = createTodoItem(addInput.value);
        todoList.appendChild(todoItem);
        addInput.value = '';
    }
    
    function toggleTodoItem() {
        const listItem = this.parentNode;
        listItem.classList.toggle('completed')
    }
    
    function editTodoItem() {
        const listItem = this.parentNode;
        const title = listItem.querySelector('.title');
        const editInput = listItem.querySelector('.textfield');
        const isEditing = listItem.classList.contains('editing');
    
        if (isEditing) {
            title.innerText = editInput.value;
            this.innerText = 'Изменить';
        } else {
            editInput.value = title.innerText;
            this.innerText = 'Сохранить'
        }
    
        listItem.classList.toggle('editing');
    }
    
    function deleteTodoItem() {
        const listItem = this.parentNode;
        todoList.removeChild(listItem);
    }
    
    const todoForm = document.getElementById('todo-form');
    const addInput = document.getElementById('add-input');
    const todoList = document.getElementById('todo-list');
    const todoItems = document.querySelectorAll('.todo-item');
    
    function main() {
        todoForm.addEventListener('submit', addTodoItem);
        todoItems.forEach(item => bindEvents(item));
    }
    
    return main;
})(document);

main();
