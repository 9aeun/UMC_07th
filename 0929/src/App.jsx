import { useContext, useState } from 'react';
import './App.css';
import Button from './Button';
import Input from './Input';
import { TodoContext } from './context/TodoContext';

function App() {
  const{
    todos,
    text,
    setText,
    editingId,
    setEditingId,
    editText,
    setEditText,
    handleSubmit,
    addTodo,
    deleteTodo,
    updateTodo,
  } = useContext(TodoContext);

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
