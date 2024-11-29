import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTodo } from "./hooks/useTodo";
import * as S from "../style/TodoDetail.style";

function TodoDetail() {
  const { id } = useParams();
  const { fetchTodoById, deleteTodo, updateTodo } = useTodo();
  const [todo, setTodo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodo = async () => {
      const data = await fetchTodoById(id);
      if (data) {
        setTodo(data);
      } else {
        alert("해당 Todo를 찾을 수 없습니다.");
        navigate("/");
      }
    };
    fetchTodo();
  }, [id, fetchTodoById, navigate]);

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
      <S.Button onClick={() => deleteTodo(id).then(() => navigate("/"))}>삭제</S.Button>
      <S.Button
        onClick={() =>
          updateTodo(id, { checked: !todo.checked }).then(() =>
            setTodo({ ...todo, checked: !todo.checked })
          )
        }
      >
        상태 변경
      </S.Button>
      <S.Button onClick={() => navigate("/")}>목록으로 돌아가기</S.Button>
    </S.Container>
  );
}

export default TodoDetail;
