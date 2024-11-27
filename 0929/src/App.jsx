import React, { useState } from "react";
import { useTodo } from "./hooks/useTodo";
import ClipLoader from "react-spinners/ClipLoader";
import * as S from "../style/Todo.style";

function App() {
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [title, setTitle] = useState(""); // 새 Todo 제목
  const [content, setContent] = useState(""); // 새 Todo 내용
  const [editingId, setEditingId] = useState(null); // 수정 중인 Todo ID
  const [editTitle, setEditTitle] = useState(""); // 수정할 제목
  const [editContent, setEditContent] = useState(""); // 수정할 내용

  const { todos, loading, error, addTodo, updateTodo, deleteTodo } = useTodo(searchTerm);

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

      {/* 검색 입력 */}
      <S.Input
        type="text"
        placeholder="검색어를 입력하세요"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Todo 생성 Form */}
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

      {/* 로딩 상태 */}
      {loading ? (
        <S.LoadingContainer>
          <ClipLoader color="#3498db" size={50} />
          <p>로딩 중...</p>
        </S.LoadingContainer>
      ) : null}

      {/* 에러 상태 */}
      {error && (
        <S.ErrorContainer>
          <p>오류 발생: {error}</p>
        </S.ErrorContainer>
      )}

<S.TodoList>
          {todos.map((todo) => (
            <S.TodoItem key={todo.id}>
              {editingId === todo.id ? (
                <S.TodoContent>
                  {/* 수정 중인 Todo 입력 필드 */}
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
                  {/* 기본 Todo 내용 */}
                  <S.Checkbox
                    type="checkbox"
                    checked={todo.checked}
                    onChange={() => updateTodo(todo.id, { checked: !todo.checked })}
                    disabled={loading}
                  />
                  <div>
                    <p>{todo.title}</p>
                    <p>{todo.content}</p>
                  </div>
                </S.TodoContent>
              )}

              {/* Todo 조작 버튼 */}
              <S.TodoActions>
                {editingId === todo.id ? (
                  <>
                    <S.Button onClick={handleEditSubmit}>수정 완료</S.Button>
                    <S.Button onClick={() => setEditingId(null)}>취소</S.Button>
                  </>
                ) : (
                  <>
                    <S.Button onClick={() => handleEdit(todo)}>수정</S.Button>
                    <S.Button onClick={() => deleteTodo(todo.id)}>삭제</S.Button>
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
