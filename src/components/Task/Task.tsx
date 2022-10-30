import Checkbox from '@mui/material/Checkbox/Checkbox'
import React from 'react'
import {TaskType} from '../../App'

type PropsType = {
    task: TaskType
    toDoId: number
    changeTaskStatus: (toDoId: number, taskId: number, isCompleted: boolean) => void
}

export const Task = (props: PropsType) => {

    const {task, changeTaskStatus, toDoId} = props

    const taskStatusHandler = () => changeTaskStatus(toDoId, task.id, !task.isCompleted)

    return (
        <div className='task'>
            <Checkbox color="success" onChange={taskStatusHandler} checked={task.isCompleted}/>
            <span className={task.isCompleted ? 'completed' : ''}>
            {task.title}
            </span>
            <hr/>
        </div>
    )
}
