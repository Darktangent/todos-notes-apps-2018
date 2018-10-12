//getting saved todos from localstorage

let getSavedTodos = () => {

    const todosJSON = localStorage.getItem('todos')
    if (todosJSON !== null) {
        return JSON.parse(todosJSON)
    } else {
        return []
    }

}

// Save todos to localStorage
const saveTodos = function (todos) {
    localStorage.setItem('todos', JSON.stringify(todos))
}
//render the app

const renderTodos = function (todos, filters) {

    let filteredTodos = todos.filter(function (todo) {
        return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    filteredTodos = filteredTodos.filter(todo => {
        if (filters.hideCompleted) {
            //if checked
            return !todo.completed
        } else {
            return true
        }
    })

    const incompleteTodos = filteredTodos.filter(function (todo) {
        return !todo.completed
    })

    document.querySelector('#todos').innerHTML = ''


    document.querySelector('#todos').appendChild(generateSummaryDOM(incompleteTodos))

    filteredTodos.forEach(function (todo) {

        document.querySelector('#todos').appendChild(generateTodoDOM(todo))
    })
}
const removeTodo = function (id) {
    const todoIndex = todos.findIndex(todo => {
        return todo.id === id
    })
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

// Toggle the completed value for a given todo
const toggleTodos = (id) => {
    const todo = todos.find((todo) => todo.id === id)

    if (todo) {
        todo.completed = !todo.completed
    }
}

//get dom elems for individual note
const generateTodoDOM = (todo) => {

    const todoEl = document.createElement('div')
    const todoText = document.createElement('span')
    const checkEl = document.createElement('input')
    const button = document.createElement('button')

    //setup checkbox
    checkEl.setAttribute('type', 'checkbox')
    todoEl.appendChild(checkEl)

    checkEl.addEventListener('change', () => {
        toggleTodos(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })


    //setup todo text

    todoText.textContent = todo.text
    todoEl.appendChild(todoText)

    //setup removebutton
    button.textContent = 'x'
    todoEl.appendChild(button)
    button.addEventListener('click', function () {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)

    })



    // const p = document.createElement('p')
    // p.textContent = todo.text
    // //return p to be called by others
    // return p

    return todoEl

}




//funtion for summary list
const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodos.length} todos left`
    return summary
}