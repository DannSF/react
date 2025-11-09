import { useState } from 'react';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: crypto.randomUUID(),
        text: inputValue,
        completed: false,
        createdAt: new Date().toLocaleTimeString(),
      };

      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="todo-list">
      <h3>📝 Todo List</h3>

      <div className="todo-input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="What needs to be done?"
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo} className="btn btn-succcess">
          ➕ Add
        </button>
      </div>
      <div className="todo-stats">
        <span>Total: {totalCount}</span>
        <span>Completed: {completedCount}</span>
        <span>Pending: {totalCount - completedCount}</span>
      </div>

      <div className="todos-container">
        {todos.length === 0 ? (
          <p className="empty-state">No tasks! Add one above.</p>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className={`todo-item ${todo.completed ? 'completed' : ''}`}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span className="todo-text">{todo.text}</span>
              <span className="todo-time">{todo.createdAt}</span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="btn btn-danger btn-small"
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>

      {completedCount > 0 && (
        <div className="todo-actions">
          <button onClick={clearCompleted} className="btn btn-warning">
            Clear Coompleted ({completedCount})
          </button>
        </div>
      )}
    </div>
  );
}
