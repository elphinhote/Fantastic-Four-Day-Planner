document.addEventListener('DOMContentLoaded', (event) => {
    if (event) {
        // Let user know that everything loaded correctly
        // console.info("DOM content Loaded");
    }

    const getTodos = () => {
        console.log('Get todos');

        let todoList = document.querySelector(".todo-list");
        todoList.textContent = ""

        fetch('/api/allTodos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data)
                data.forEach(({ id, todo }) => {
                    console.log(todo)

                    let todoList = document.querySelector(".todo-list");
                    let todoName = document.createElement("li");

                    todoName.classList.add("todo-name")
                    // todoList.append(todoName)


                    let todoNameSelector = document.querySelector(".todo-name")

                    let deleteTodo = document.createElement("button");
                    deleteTodo.classList.add("delete-todo");
                    deleteTodo.textContent = "Delete"


                    let updateTodo = document.createElement("button");
                    updateTodo.textContent = "update"
                    updateTodo.classList.add("updateTodo");
                    let updateTodoId = updateTodo.setAttribute("id", id)

                    updateTodo.addEventListener("click", (e) => {
                        console.log("update clicked")
                        updateTodoId = e.target.getAttribute("id")
                        console.log(updateTodoId)
                        console.log(todo)

                        updateTodoRequest(updateTodoId)

                    })

                    let todoId = deleteTodo.setAttribute("id", id)
                    deleteTodo.addEventListener("click", (e) => {
                        console.log("clicked")
                        todoId = e.target.getAttribute("id")
                        console.log(todoId)

                        deleteTodoRequest(todoId)
                        todoName.textContent = ""
                        // todoId.textContent = ""
                        // updateTodoId.textContent = ""
                    })


                    todoName.textContent = todo
                    todoList.append(todoName, deleteTodo, updateTodo)

                })
                // .catch((error) => console.error('Error:', error));

                // Get the list of todos

            })




    }
    getTodos()


    const newTodoInput = document.querySelector(".new-todo")
    const addTodoButton = document.querySelector(".add-todo-button");
    addTodoButton.addEventListener('click', (e) => {
        // prevent that default behavior
        e.preventDefault();
        const newTodo = newTodoInput.value
        // console.log("todoclicked")
        // console.log(newTodo)
        swal('Great','Added to your list','success')
        const addTodo = {
            
            todo: newTodo,
        }
        // Create a todo

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
                // todoList.textContent = ""


                // location.reload()
                getTodos()
            })
            // Catching all them errors!
            .catch((error) => {
                console.error('Error:', error);
            });
    })

    function deleteTodoRequest(todoId) {
        fetch(`/api/allTodos/${todoId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(getTodos);
    };

    function updateTodoRequest(updateTodoId) {
        console.log(updateTodoId)

        // console.log(newTodoInput)

        let updateTheTodo = newTodoInput.value
        console.log(updateTheTodo)

        const updTodo = {
            todo: updateTheTodo,
        }

        fetch(`/api/allTodos/${updateTodoId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updTodo),
        })
            .then((results) => results.json())
            .then((data) => {
                console.log('Success in updating:', data);
                // console.log(`Todo added: ${addTodo.todo}`);
                newTodoInput.value = ""
                // todoList.textContent = ""


                // location.reload()
                getTodos()
            })
            // Catching all them errors!
            .catch((error) => {
                console.error('Error:', error);
            });


    }
    // const newTodoInput = document.querySelector(".new-todo")

    // const update = newTodoInput.value
    // console.log("todoclicked")
    // console.log(newTodo)

    // const addTodo = {
    //     todo: newTodo,
    // }
    // Create a todo

    // fetch("/api/newTodo", {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(addTodo),
    // })
    //     // Json the data
    //     .then((addTodo) => addTodo.json())
    //     .then((data) => {
    //         console.log('Success in adding todo:', data);
    //         // console.log(`Todo added: ${addTodo.todo}`);
    //         newTodoInput.value = ""
    //         // todoList.textContent = ""


    //         // location.reload()
    //         getTodos()
    //     })
    //     // Catching all them errors!
    //     .catch((error) => {
    //         console.error('Error:', error);
    //     });



    // fetch(`/api/allTodos`, {
    //     method: 'PUT',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(updateTodoId),

    // }).then((response) => response.json())
    //     .then((data) => {
    //         console.log(data)
    //         console.log("Update")

    //         // console.log(todo)





    // })
    // }

    // TEST UPDATE TEST!
    // function updateTodoRequest(updateTodoId) {
    //     fetch(`/api/allTodos/:${updateTodoId}`, {
    //         method: "PUT",

    //     }).then((response) => response.json())
    //         .then((data) => {
    //             console.log(data)

    //         })
    // }


    // newTodoInput.value = data.todo
    // // addTodoButton.textContent = "update"
    // let newUpdateBtn = createElement("button")
    // newUpdateBtn.classList.add("new-update-button")
    // const newUpdateButton = document.querySelector(".new-update-button")
    // newUpdateButton.addEventListener('click', (e) => {
    //     // prevent that default behavior
    //     e.preventDefault();
    //     console.log("click")


    // })
    // .then(getTodos);
    //END OF TEST

});
