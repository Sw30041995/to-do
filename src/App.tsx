import React, {useState} from 'react'
import './App.css'
import {ToDo} from './components/ToDo'

export type TaskType = {
    id: number
    title: string
    isCompleted: boolean
}

export type FilterType = 'all' | 'completed' | 'active'

export type ToDoType = {
    id: number
    filter: FilterType
}
export type TasksStateType = { [key: string]: TaskType[] }

function App() {

    const generateId = () => Math.floor(Math.random() * 200000)

    const toDoId = generateId()

    const [toDos, setToDos] = useState<ToDoType[]>([{
        id: toDoId,
        filter: 'all'
    }])
    const [tasks, setTasks] = useState<TasksStateType>({
        [toDoId]: [
            {id: generateId(), title: 'Тестовое задание', isCompleted: false},
            {id: generateId(), title: 'Прекрасный код', isCompleted: true},
            {id: generateId(), title: 'Покрытие тестами', isCompleted: false},
        ]
    })

    const changeTaskStatus = (toDoId: number, taskId: number, isCompleted: boolean) => {
        setTasks({...tasks, [toDoId]: tasks[toDoId].map(t => t.id === taskId ? {...t, isCompleted} : t)})
    }

    const addTask = (toDoId: number, taskTitle: string) => {
        setTasks({...tasks, [toDoId]: [{id: generateId(), title: taskTitle, isCompleted: false}, ...tasks[toDoId]]})
    }

    const changeToDoFilter = (toDoId: number, newFilterValue: FilterType) => {
        setToDos(toDos.map(td => td.id === toDoId ? {...td, filter: newFilterValue} : td))
    }

    const deleteCompletedTasks = (toDoId: number) => {
        setTasks({...tasks, [toDoId]: tasks[toDoId].filter(t => !t.isCompleted)})
    }

    return (
        <div className='App'>
            <h1 className='title'>todos</h1>
            <div className='toDoLists'>
                {toDos.map(td => <ToDo key={td.id} toDo={td} tasks={tasks[td.id]} changeToDoFilter={changeToDoFilter}
                                       changeTaskStatus={changeTaskStatus} addTask={addTask}
                                       deleteCompletedTasks={deleteCompletedTasks}/>)}
            </div>
        </div>
    )
}

export default App
