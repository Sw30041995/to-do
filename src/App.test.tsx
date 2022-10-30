import React from 'react'
import {render, screen} from '@testing-library/react'
import App from './App'

test('App renders', () => {
    render(<App/>)
    expect(screen.getByText(/todos/i)).toBeInTheDocument()
})
