import { createContext, useState, useCallback, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";

export const TodoContext = createContext();

export default function TodoContextProvider({ children }) {
  const { request, loading, error } = useFetch();
  const [todos, setTodos] = useState([]);

  // 의존성에서 request를 제외한 fetchTodos
  const fetchTodos = useCallback(async (search = "") => {
    try {
      const query = search ? `?title=${encodeURIComponent(search)}` : "";
      const [response] = await request(`http://localhost:3000/todo${query}`, {
        method: "GET",
      });
      const todosData = Array.isArray(response) ? response[0] : []; // 이중 배열 처리
      console.log("Fetched Todos:", todosData); // 디버깅용 로그
      setTodos(todosData || []); // 상태 업데이트
    } catch (err) {
      console.error("Todo 목록 불러오기 실패:", err);
    }
  }, []); // request를 의존성에서 제거

  // 초기 데이터 로드
  useEffect(() => {
    fetchTodos(); // 컴포넌트 마운트 시 초기 데이터 로드
  }, []); // 의존성을 최소화

  const addTodo = async (title, content) => {
    try {
      await request("http://localhost:3000/todo", {
        method: "POST",
        body: JSON.stringify({ title, content }),
      });
      fetchTodos(); // 목록 새로고침
    } catch (err) {
      console.error("Failed to add todo:", err);
    }
  };

  const updateTodo = async (id, updateFields) => {
    try {
      await request(`http://localhost:3000/todo/${id}`, {
        method: "PATCH",
        body: JSON.stringify(updateFields),
      });
      fetchTodos(); // 목록 새로고침
    } catch (err) {
      console.error(`Failed to update todo with id ${id}:`, err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await request(`http://localhost:3000/todo/${id}`, { method: "DELETE" });
      fetchTodos(); // 목록 새로고침
    } catch (err) {
      console.error(`Failed to delete todo with id ${id}:`, err);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        fetchTodos,
        addTodo,
        updateTodo,
        deleteTodo,
        loading,
        error,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
