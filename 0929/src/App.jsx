import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTodo } from "./hooks/useTodo";
import ClipLoader from "react-spinners/ClipLoader";
import * as S from "../style/Todo.style";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    loading,
    error,
  } = useTodo(searchTerm);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const navigate = useNavigate();

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

  const handleEdit = (todo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
    setEditContent(todo.content);
  };

  const handleEditSubmit = async () => {
    if (!editTitle.trim() || !editContent.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }
    await updateTodo(editingId, { title: editTitle.trim(), content: editContent.trim() });
    setEditingId(null);
    setEditTitle("");
    setEditContent("");
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
          <S.TodoItem key={todo.id} onClick={() => navigate(`/todo/${todo.id}`)}>
            {editingId === todo.id ? (
              <S.TodoContent>
                <S.Input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <S.TextArea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
              </S.TodoContent>
            ) : (
              <S.TodoContent>
                <S.Checkbox
                  type="checkbox"
                  checked={todo.checked}
                  onChange={(e) => {
                    e.stopPropagation();
                    updateTodo(todo.id, { checked: !todo.checked });
                  }}
                  disabled={loading}
                />
                <div>
                  <p>{todo.title}</p>
                  <p>{todo.content}</p>
                </div>
              </S.TodoContent>
            )}
            <S.TodoActions>
              {editingId === todo.id ? (
                <>
                  <S.Button onClick={handleEditSubmit}>수정 완료</S.Button>
                  <S.Button onClick={() => setEditingId(null)}>취소</S.Button>
                </>
              ) : (
                <>
                  <S.Button onClick={(e) => { e.stopPropagation(); handleEdit(todo); }}>
                    수정
                  </S.Button>
                  <S.Button onClick={(e) => { e.stopPropagation(); deleteTodo(todo.id); }}>
                    삭제
                  </S.Button>
                </>
              )}
            </S.TodoActions>
          </S.TodoItem>
        ))}
      </S.TodoList>
    </S.Container>
  );
}

export default App;
