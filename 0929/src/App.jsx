import { useState } from 'react';
import './App.css';
import Button from './Button';
import Input from './Input';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, task: '투두 만들어보기' },
    { id: 2, task: '희연 혜원 혜윤 건 찬민' },
  ]);

  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState('');
  const [editText, setEditText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const addTodo = () => {
    setTodos((prev) => [
      ...prev,
      { id: Math.floor(Math.random() * 100) + 2, task: text },
    ]);
    setText('');
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  const updateTodo = (id, text) => {
    setTodos((prev) =>
      prev.map((item) => (item.id === id ? { ...item, task: text } : item))
    );
    setEditingId('');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          className="todo-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="할 일을 입력하세요"
        />
        <Button 
          className="todo-button" 
          label="할 일 등록" 
          onClick={addTodo} 
        />
      </form>
      <div>
        {todos.map((todo, index) => (
          <div key={todo.id} className="todo-item">
            {editingId !== todo.id && (
              <div className="todo-display">
                <p>{todo.id}.</p>
                <p>{todo.task}</p>
              </div>
            )}
            {editingId === todo.id && (
              <div className="todo-edit">
                <p>{todo.id}.</p>
                <Input
                  className="edit-input"
                  defaultValue={todo.task}
                  onChange={(e) => setEditText(e.target.value)}
                />
              </div>
            )}
            <Button 
              className="delete-button" 
              label="삭제하기" 
              onClick={() => deleteTodo(todo.id)} 
            />
            {editingId === todo.id ? (
              <Button
                className="edit-button"
                label="수정 완료"
                onClick={() => updateTodo(editingId, editText)}
              />
            ) : (
              <Button
                className="edit-button"
                label="수정 진행"
                onClick={() => setEditingId(todo.id)}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
