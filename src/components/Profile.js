import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './TodoList.css';


const TodoList = () => {
  const { user, isAuthenticated } = useAuth0();
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [newDeadline, setNewDeadline] = useState('');

  const handleAddTodo = () => {
    const newId = Date.now();
    const newTodoItem = { id: newId, text: newTodo, deadline: newDeadline };
    setTodos([...todos, newTodoItem]);
    setNewTodo('');
    setNewDeadline('');
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleEditTodo = (id, updatedText, updatedDeadline) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, text: updatedText, deadline: updatedDeadline };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    isAuthenticated && (
      <article className='column'>
        {user?.picture && <img src={user.picture} alt={user?.name} />}
        <h2>{user?.name}'s Project List</h2>
        <div className='todos-container'>
          <ul className='todos-list'>
            {todos.map((todo) => (
              <li className='todo-item' key={todo.id}>
                <div>
                  <span className='todo-text'>{todo.text}</span>
                  <span className='todo-deadline'>{todo.deadline}</span>
                </div>
                <div>
                  <button className='todo-button' onClick={() => handleEditTodo(todo.id, prompt('Enter new text', todo.text), prompt('Enter new deadline', todo.deadline))}>Edit</button>
                  <button className='todo-button' onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
          <div className='todo-inputs'>
            <input className='todo-input' type='text' placeholder='Enter a new Project' value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
            <input className='todo-input' type='date' placeholder='Enter a deadline' value={newDeadline} onChange={(e) => setNewDeadline(e.target.value)} />
            <button className='todo-button' onClick={handleAddTodo}>Add Project</button>
          </div>
        </div>
      </article>
    )
  );
};

export default TodoList;
