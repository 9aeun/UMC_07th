import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TodoContext } from "./context/TodoContext";
import * as S from "../style/TodoDetail.style";

function Detail() {
  const { id } = useParams(); // URL의 id 파라미터 가져오기
  const { fetchTodoById, deleteTodo, updateTodo } = useContext(TodoContext);
  const [todo, setTodo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodo = async () => {
      const data = await fetchTodoById(id); // id에 해당하는 Todo 데이터 가져오기
      setTodo(data);
    };
    fetchTodo();
  }, [id, fetchTodoById]);

  if (!todo) return <p>로딩 중...</p>;

  return (
    <S.Container>
      <S.Header>Todo 상세 정보</S.Header>
      <S.DetailBox>
        <p>
          <strong>제목:</strong> {todo.title}
        </p>
        <p>
          <strong>내용:</strong> {todo.content}
        </p>
        <p>
          <strong>상태:</strong> {todo.checked ? "완료" : "미완료"}
        </p>
        <p>
          <strong>생성 시간:</strong> {new Date(todo.createdAt).toLocaleString()}
        </p>
        <p>
          <strong>수정 시간:</strong> {new Date(todo.updatedAt).toLocaleString()}
        </p>
      </S.DetailBox>
      <S.Button onClick={() => deleteTodo(id)}>삭제</S.Button>
      <S.Button
        onClick={() => updateTodo(id, { checked: !todo.checked })}
      >
        상태 변경
      </S.Button>
      <S.Button onClick={() => navigate("/")}>목록으로 돌아가기</S.Button>
    </S.Container>
  );
}

export default Detail;
