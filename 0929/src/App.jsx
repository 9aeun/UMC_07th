import React, { useState } from "react";
import { useTodo } from "./hooks/useTodo";
import ClipLoader from "react-spinners/ClipLoader";
import * as S from "../style/Todo.style";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const { todos, addTodo, updateTodo, deleteTodo, loading, error } = useTodo(searchTerm);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }
    await addTodo(title.trim(), content.trim());
    setTitle("");
    setContent("");
  };

  return (
    <S.Container>
      <S.Header>UMC ToDoList</S.Header>
      <S.Input
        type="text"
        placeholder="검색어를 입력하세요"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <S.Form onSubmit={handleAddTodo}>
        <S.Input
          type="text"
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />
        <S.TextArea
          placeholder="내용을 입력해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={loading}
        />
        <S.Button type="submit" disabled={loading || !title.trim() || !content.trim()}>
          추가
        </S.Button>
      </S.Form>
      {loading && (
        <S.LoadingContainer>
          <ClipLoader color="#3498db" size={50} />
          <p>로딩 중...</p>
        </S.LoadingContainer>
      )}
      {error && (
        <S.ErrorContainer>
          <p>오류 발생: {error}</p>
        </S.ErrorContainer>
      )}
      <S.TodoList>
        {todos.map((todo) => (
          <S.TodoItem key={todo.id}>
            <div>
              <p>{todo.title}</p>
              <p>{todo.content}</p>
            </div>
            <S.TodoActions>
              <S.Button onClick={() => updateTodo(todo.id, { checked: !todo.checked })}>
                체크
              </S.Button>
              <S.Button onClick={() => deleteTodo(todo.id)}>삭제</S.Button>
            </S.TodoActions>
          </S.TodoItem>
        ))}
      </S.TodoList>
    </S.Container>
  );
}

export default App;
