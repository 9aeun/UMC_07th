import { useContext, useState } from "react";
import { TodoContext } from "./context/TodoContext";
import ClipLoader from "react-spinners/ClipLoader";
import * as S from "../style/Todo.style";

function App() {
  const {
    todos,
    title,
    setTitle,
    content,
    setContent,
    addTodo,
    updateTodo,
    deleteTodo,
    loading,
    error,
  } = useContext(TodoContext);

  const [editingId, setEditingId] = useState(null); // 수정 중인 Todo ID
  const [editTitle, setEditTitle] = useState(""); // 수정 중인 제목
  const [editContent, setEditContent] = useState(""); // 수정 중인 내용

  // 수정 모드로 전환
  const handleEdit = (todo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
    setEditContent(todo.content);
  };

  // 수정 완료 처리
  const handleEditSubmit = async () => {
    if (editTitle.trim() === "" || editContent.trim() === "") {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }
    await updateTodo(editingId, editTitle, editContent, null);
    setEditingId(null); // 수정 모드 종료
    setEditTitle(""); // 제목 초기화
    setEditContent(""); // 내용 초기화
  };

  return (
    <S.Container>
      <S.Header>UMC ToDoList</S.Header>
      <S.Form onSubmit={(e) => e.preventDefault()}>
        <S.Input
          type="text"
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <S.TextArea
          placeholder="내용을 입력해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <S.Button
          type="button"
          onClick={addTodo}
          disabled={!title.trim() || !content.trim()}
        >
          ToDo 생성
        </S.Button>
      </S.Form>

      {loading ? (
        <S.LoadingContainer>
          <ClipLoader color="#3498db" size={50} />
          <p>로딩 중...</p>
        </S.LoadingContainer>
      ) : error ? (
        <S.ErrorContainer>
          <p>오류 발생: {error}</p>
        </S.ErrorContainer>
      ) : (
        <S.TodoList>
          {todos.map((todo) => (
            <S.TodoItem key={todo.id}>
              {editingId === todo.id ? (
                // 수정 모드 UI
                <S.TodoContent>
                  <S.Input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="제목을 수정해주세요"
                  />
                  <S.TextArea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    placeholder="내용을 수정해주세요"
                  />
                </S.TodoContent>
              ) : (
                // 기본 UI
                <S.TodoContent>
                  <S.Checkbox
                    type="checkbox"
                    checked={todo.checked}
                    onChange={() => updateTodo(todo.id, null, null, !todo.checked)}
                  />
                  <p>{todo.title}</p>
                  <p>{todo.content}</p>
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
                    <S.Button onClick={() => handleEdit(todo)}>수정</S.Button>
                    <S.Button onClick={() => deleteTodo(todo.id)}>삭제</S.Button>
                  </>
                )}
              </S.TodoActions>
            </S.TodoItem>
          ))}
        </S.TodoList>
      )}
    </S.Container>
  );
}

export default App;
