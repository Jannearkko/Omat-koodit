import App from './App'
import { render, screen, fireEvent } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers)

test('renders App component', () => {
    render(<App></App>)
    const header = screen.getByText('My Todolist')
    expect(header).toBeInTheDocument();
})

test('add todo', ()=> {
    render(<App></App>)

    const desc = screen.getByPlaceholderText('Description');
    fireEvent.change(desc, { target: { value: 'Go to coffee' } });
    const date = screen.getByPlaceholderText('Date');
    fireEvent.change(date, { target: { value: '29.12.2023' } });
    const status = screen.getByPlaceholderText('Status');
    fireEvent.change(status, { target: { value: 'Open' } });

    const button = screen.getByText('Add');
    fireEvent.click(button);

    const table = screen.getByRole('table');
    expect(table).toHaveTextContent('Go to coffee');

    // clear test

    const button2 = screen.getByText('Remove All');
    fireEvent.click(button2)
    expect(table).toHaveTextContent('')
})