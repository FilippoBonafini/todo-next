import { ITask } from "./types/tasks"

const baseUrl = 'http://localhost:3000/api'

// RECUPERA TUTTI I TODO 
export const getAllTodos = async (): Promise<ITask[]> => {
    const res = await fetch(`${baseUrl}/tasks`, { cache: 'no-store' })
    const todos = await res.json()
    return todos.data;
}

// AGGIUNGE UN TODO 
export const addTodo = async (todo: ITask): Promise<ITask> => {
    const res = await fetch(`${baseUrl}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    })
    const newTodo = await res.json();
    return newTodo;
}

// MODIFICA UN TODO 
export const editTodo = async (todo: ITask): Promise<ITask> => {
    const res = await fetch(`${baseUrl}/tasks/${todo.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    })
    const updatedTodo = await res.json();
    return updatedTodo;
}

// ELIMINA UN TODO 
export const deleteTodo = async (id: string): Promise<void> => {
    await fetch(`${baseUrl}/tasks/${id}`, {
        method: 'DELETE'
    })
}