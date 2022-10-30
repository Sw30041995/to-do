import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {Task} from './Task/Task'
import {FilterType, TaskType, ToDoType} from '../App'
import Paper from '@mui/material/Paper/Paper'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

type PropsType = {
    toDo: ToDoType
    tasks: TaskType[]
    changeTaskStatus: (toDoId: number, taskId: number, isCompleted: boolean) => void
    changeToDoFilter: (toDoId: number, newFilterValue: FilterType) => void
    deleteCompletedTasks: (toDoId: number) => void
    addTask: (toDoId: number, taskTitle: string) => void
}

export const ToDo = (props: PropsType) => {

    const {tasks, changeTaskStatus, toDo, changeToDoFilter, deleteCompletedTasks, addTask} = props

    const count = tasks.filter(t => !t.isCompleted).length

    const [collapsed, setCollapsed] = useState(true)
    const [title, setTitle] = useState('')
    const [error, setError] = useState(false)

    const toDoAllFilterHandler = () => changeToDoFilter(toDo.id, 'all')
    const toDoActiveFilterHandler = () => changeToDoFilter(toDo.id, 'active')
    const toDoCompletedFilterHandler = () => changeToDoFilter(toDo.id, 'completed')
    const taskDeletionHandler = () => deleteCompletedTasks(toDo.id)

    const onInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const addItem = () => {
        if (title.trim() === '') {
            setError(true)
            return
        }
        addTask(toDo.id, title.trim())
        setTitle('')
    }

    const addTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            addItem()
        }
    }

    const activeButton = (active: FilterType) => {
        return toDo.filter === active ? 'active' : ''
    }

    let tasksForToDo = tasks
    if (toDo.filter === 'active') {
        tasksForToDo = tasks.filter(t => !t.isCompleted)
    }
    if (toDo.filter === 'completed') {
        tasksForToDo = tasks.filter(t => t.isCompleted)
    }

    return (
        <div className='toDo'>
            <Paper className='paper' elevation={6}>
                <div className='addTaskBlock'>
                    <KeyboardArrowDownIcon onClick={() => setCollapsed(!collapsed)} className='arrow'/>
                    <input value={title} className={`addTaskInput ${error ? 'error' : ''}`} onChange={onInputHandler}
                           onKeyPress={addTaskHandler}
                           placeholder='What needs to be done?' type="text"/>
                </div>
                <hr/>
                {collapsed &&
                <div>
                    <div className='tasks'>
                        {tasksForToDo.map(t => <Task key={t.id} task={t} toDoId={toDo.id}
                                                     changeTaskStatus={changeTaskStatus}/>)}
                    </div>
                    <div className='toDoFilters'>
                        <span>{count === 0 ? 'All items completed' : `${count} items left`}</span>
                        <div>
                            <button className={`filter ${activeButton('all')}`}
                                    onClick={toDoAllFilterHandler}>All
                            </button>
                            <button className={`filter ${activeButton('active')}`}
                                    onClick={toDoActiveFilterHandler}>Active
                            </button>
                            <button className={`filter ${activeButton('completed')}`}
                                    onClick={toDoCompletedFilterHandler}>Completed
                            </button>
                        </div>
                        <button className='clear' onClick={taskDeletionHandler}>Clear completed</button>
                    </div>
                </div>}
            </Paper>
        </div>
    )
}

