const myForm = document.getElementById('myForm')
const todoItems = document.getElementById('todo_items')
const completedItem = document.getElementById('completed_items')
const todo = document.getElementById('todo')
const desc = document.getElementById('description')
myForm.addEventListener('submit',onSubmit)
todoItems.addEventListener('click',onDelete)
const showAll = async() =>{
    while(todoItems.firstChild){
        todoItems.removeChild(todoItems.firstChild)
    }
    try {
        const responseTodo = await axios.get('/api/v1/todo')
        const todo = responseTodo.data.todos
        for (i=0;i<todo.length;i++){
            showOutputTodo(todo[i])
        }
    } catch (error) {
        console.log(error)
    }
    while(completedItem.firstChild){
        completedItem.removeChild(completedItem.firstChild)
    }
    try {
        const completed = await axios.get('/api/v1/completed')
        const todoCompleted = completed.data.completed
        for(i=0;i<todoCompleted.length;i++){
            showOutputCompleted(todoCompleted[i])
        }
    } catch (error) {
        console.log(error)
    }
}

async function onSubmit(e){
    e.preventDefault()
    const data = {todo:todo.value,description:desc.value}
    try {
        await axios.post('/api/v1/todo/add',data)
        showAll()
    } catch (error) {
        console.log(error)
    }
    todo.value=''
    desc.value=''
}

function showOutputTodo(user){
    const item = document.getElementById('todo_items')
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(`${user.todo} - ${user.description} `))
    const delBtn = document.createElement('button')
    delBtn.textContent = 'delete'
    delBtn.classList.add('delete')
    delBtn.dataset.id = user.id
    const editBtn = document.createElement('button')
    editBtn.textContent = 'completed'
    editBtn.classList.add('complete')
    editBtn.dataset.id = user.id
    li.appendChild(editBtn)
    li.appendChild(delBtn)
    item.appendChild(li)
}
function showOutputCompleted(user){
    const item = document.getElementById('completed_items')
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(`${user.todo} - ${user.description} `))
    item.appendChild(li)
}
document.addEventListener('DOMContentLoaded',showAll)

async function onDelete (e){
    if(e.target.classList.contains('delete')){
        try {
            const id = e.target.dataset.id
            await axios.delete(`/api/v1/todo/${id}`)
            showAll()
        } catch (error) {
            console.log(error)
        }
    }
    if(e.target.classList.contains('complete')){
        try {
            const id = e.target.dataset.id
            const editUser = await axios.get(`api/v1/todo/${id}`)
            const tododetail = editUser.data.response
            const completedTodo = {todo:tododetail.todo, description: tododetail.description}
            await axios.post('api/v1/completed/add',completedTodo)
            await axios.delete(`api/v1/todo/${tododetail.id}`)
            showAll()
        } catch (error) {
            console.log(error)
        }
    }
}