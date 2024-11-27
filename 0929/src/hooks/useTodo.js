import { useState, useEffect, useCallback } from "react";
import { useDebounce } from "./useDebounce";
import { useFetch } from "./useFetch";

export const useTodo = (searchTerm) => {
  const { request, loading, error } = useFetch();
  const [todos, setTodos] = useState([]);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Todo 목록 가져오기
  const fetchTodos = useCallback(async (search = "") => {
    try {
      const query = search ? `?title=${encodeURIComponent(search)}` : "";
      const [response] = await request(`http://localhost:3000/todo${query}`, {
        method: "GET",
      });
      setTodos(response || []);
    } catch (err) {
      console.error("Todo 목록 불러오기 실패:", err);
    }
  }, [request]);

  // 검색어 변경 시 fetchTodos 실행
  useEffect(() => {
    fetchTodos(debouncedSearchTerm);
  }, [debouncedSearchTerm, fetchTodos]);

  // Todo 추가
  const addTodo = async (title, content) => {
    try {
      await request("http://localhost:3000/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      fetchTodos(); // 추가 후 목록 갱신
    } catch (err) {
      console.error("Failed to add todo:", err);
    }
  };

  // Todo 수정
  const updateTodo = async (id, updateFields) => {
    try {
      await request(`http://localhost:3000/todo/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateFields),
      });
      fetchTodos(); // 수정 후 목록 갱신
    } catch (err) {
      console.error(`Failed to update todo with id ${id}:`, err);
    }
  };

  // Todo 삭제
  const deleteTodo = async (id) => {
    try {
      await request(`http://localhost:3000/todo/${id}`, {
        method: "DELETE",
      });
      fetchTodos(); // 삭제 후 목록 갱신
    } catch (err) {
      console.error(`Failed to delete todo with id ${id}:`, err);
    }
  };

  return { todos, loading, error, addTodo, updateTodo, deleteTodo };
};
