document.addEventListener('DOMContentLoaded', (event) => {
    if (event) {
        // Let user know that everything loaded correctly
        console.info("DOM content Loaded");
    }

    const newTodoInput = document.querySelector(".new-todo")
    const addTodoButton = document.querySelector(".add-todo-button");
    addTodoButton.addEventListener('click', (e) => {
        // prevent that default behavior
        e.preventDefault();
        const newTodo = newTodoInput.value
        console.log("todoclicked")
        console.log(newTodo)
    })




})