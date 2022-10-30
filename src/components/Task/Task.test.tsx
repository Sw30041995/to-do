import {TasksStateType, ToDoType} from '../../App'
import {render, screen} from '@testing-library/react'
import {Task} from './Task'
import React from 'react'

let toDos: ToDoType[] = []
let toDoId: number = 1
let tasks: TasksStateType = {}

beforeEach(() => {
    toDos = [{id: toDoId, filter: 'all'}]

    tasks = {
        [toDoId]: [
            {id: 1, title: 'Тестовое задание', isCompleted: false},
            {id: 1, title: 'Прекрасный код', isCompleted: true},
            {id: 1, title: 'Покрытие тестами', isCompleted: false},
        ]
    }
})

test('Task renders', () => {
    render(<Task changeTaskStatus={() => {
    }} task={tasks[toDoId][0]} toDoId={toDoId}/>)

    expect(screen.getByText('Тестовое задание')).toBeInTheDocument()
})


