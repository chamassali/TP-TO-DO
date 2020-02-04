const dateElement = document.getElementById("date");
const options = {weekday : "long", month:"long", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);


const root = document.querySelector('.todolist');

const showTodos = function(root) {

  root.innerHTML = '';
  
  todos.forEach(function(todo, index) {
    const todoElement = document.createElement('li');
    todoElement.classList.add('todo-item');
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.checked;
    checkbox.onclick = function() {
    todos[index] = {name: todo.name, checked: !todo.checked}
    showTodos(root);
    }
    
    const deleteBtn = document.createElement('span')
    deleteBtn.style.cursor = 'pointer';
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.onclick = function() {
    todos = todos.filter(function (t) {
    return t.name != todo.name
    });
    showTodos(root); 
    }

    const text = document.createElement('span');
    text.classList.add("todoname")
    text.innerText = todo.name;


    todoElement.appendChild(checkbox);
    todoElement.appendChild(text);
    todoElement.appendChild(deleteBtn);
    root.appendChild(todoElement);
  });
  
  localStorage['TodoList'] = JSON.stringify(todos);
}

let todos;
if (!localStorage['TodoList']) {
 todos = [{
  name: 'Cool',
  checked: false
}]

} else {
	todos = JSON.parse(localStorage['TodoList']);
} 

showTodos(root);

document.querySelector('.add-button').onclick = () => {
  let inputElement = document.querySelector('.input-text');
  if (inputElement.value.trim() != "") {

    todos.push({
      name: inputElement.value,
      checked: false,
    })
    inputElement.value="";
    showTodos(root);  
  }
}


addEventListener("keyup", function(e){
  if (event.keyCode == 13) {
    let inputElement = document.querySelector('.input-text');
    if (inputElement.value.trim() != "") {

      todos.push({
        name: inputElement.value,
        checked: false,
      })
      inputElement.value="";
      showTodos(root);  
    }
  }
})
