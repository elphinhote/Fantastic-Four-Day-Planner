// Event to let the user know that the DOM content Loaded
document.addEventListener('DOMContentLoaded', (event) => {
    if (event) {

    }

    // Function to get the todos from the database
    function getTodos() {
        // DOM get the list
        let todoList = document.querySelector(".todo-list");
        // Set the contents to blank
        todoList.textContent = ""

        // Fetch request for all the todos
        fetch('/api/allTodos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            // JSON the response
            .then((response) => response.json())
            // Then get the data
            .then((data) => {
                // For each loop getting the id and the todo
                data.forEach(({ id, todo }) => {
                    // Grab the HTML
                    let todoList = document.querySelector(".todo-list");
                    let todoName = document.createElement("li");
                    // Add the class 
                    todoName.classList.add("todo-name")
                    // More HTML getting
                    let todoNameSelector = document.querySelector(".todo-name")
                    // Create the delete to do button
                    let deleteTodo = document.createElement("button");
                    // Add the class
                    deleteTodo.classList.add("delete-todo", "btn", "btn-sm", "btn-outline-danger");
                    // Set it to say delete
                    deleteTodo.textContent = "Delete"

                    // Create the update todo button
                    let updateTodo = document.createElement("button");
                    // Set it to say update
                    updateTodo.textContent = "Update"
                    // add the class
                    updateTodo.classList.add("updateTodo", "btn", "btn-sm", "btn-outline-info");
                    // set the id for being able to update todo
                    let updateTodoId = updateTodo.setAttribute("id", id)
                    // Event listener for the update button
                    updateTodo.addEventListener("click", (e) => {
                        //    get the Id of the button
                        updateTodoId = e.target.getAttribute("id")
                        //  Call the update todo button
                        updateTodoRequest(updateTodoId)

                    })
                    // Set the id for being able to delete the todo
                    let todoId = deleteTodo.setAttribute("id", id)
                    // Event listener for the delete button
                    deleteTodo.addEventListener("click", (e) => {
                        // Target that attribute to delete
                        todoId = e.target.getAttribute("id")

                        // Call the delete function
                        deleteTodoRequest(todoId)
                        // Set the contents to blank
                        todoName.textContent = ""

                    })

                    // Set the text contents
                    todoName.textContent = todo
                    // Append the list to have th update and delete buttons
                    todoList.append(todoName, deleteTodo, updateTodo)

                })

            })

    }
    // Call the get todo function
    getTodos()

    // Get the DOM for the new todo
    const newTodoInput = document.querySelector(".new-todo")
    const addTodoButton = document.querySelector(".add-todo-button");
    // Event listener for the add to do button
    addTodoButton.addEventListener('click', (e) => {
        // prevent that default behavior
        e.preventDefault();
        const newTodo = newTodoInput.value
        // Sweet Alert
        swal('Great', 'Added to your list', 'success')
        const addTodo = {
            todo: newTodo,
        }
        // Fetch Request to get the new todo
        fetch("/api/newTodo", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(addTodo),
        })
            // Json the data
            .then((addTodo) => addTodo.json())
            .then((data) => {
                console.log('Success in adding todo:', data);
                // console.log(`Todo added: ${addTodo.todo}`);
                newTodoInput.value = ""
                // Call the get todo function
                getTodos()
            })
            // Catching all them errors!
            .catch((error) => {
                console.error('Error:', error);
            });
    })

    // Function for deleteing a todo
    function deleteTodoRequest(todoId) {
        // Fetch request for deleting the todo
        fetch(`/api/allTodos/${todoId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            // Call the get todo function
        }).then(getTodos);
    };

    // Function for updating the todo
    function updateTodoRequest(updateTodoId) {
        // Grab the value
        let updateTheTodo = newTodoInput.value

        const updTodo = {
            todo: updateTheTodo,
        }

        // Fetch request to update the todo
        fetch(`/api/allTodos/${updateTodoId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updTodo),
        })
            // JSON the results
            .then((results) => results.json())
            // console log the data and reset the value
            .then((data) => {
                console.log('Success in updating:', data);
                // console.log(`Todo added: ${addTodo.todo}`);
                newTodoInput.value = ""
                // todoList.textContent = ""


                // Call the get todo function
                getTodos()
            })
            // Catching all them errors!
            .catch((error) => {
                console.error('Error:', error);
            });


    }

});
