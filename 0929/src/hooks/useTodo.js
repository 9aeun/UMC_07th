import { useState, useEffect, useCallback } from "react";
import { useDebounce } from "./useDebounce";
import axios from "axios";

export const useTodo = (searchTerm) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const fetchTodos = useCallback(async (search = "") => {
    setLoading(true);
    setError(null);

    try {
      const query = search ? `?title=${encodeURIComponent(search)}` : "";
      const response = await axios.get(`http://localhost:3000/todo${query}`);
      
      // 서버 응답이 이중 배열인 경우 처리
      const todosData = Array.isArray(response.data) && Array.isArray(response.data[0])
        ? response.data[0]
        : response.data;

      setTodos(todosData || []); // 상태 업데이트
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Something went wrong!");
      console.error("Todo 목록 불러오기 실패:", err);
    } finally {
      setLoading(false); // 로딩 상태 해제
    }
  }, []);

  useEffect(() => {
    fetchTodos(debouncedSearchTerm); // 검색어 변경에 따라 데이터 로드
  }, [debouncedSearchTerm, fetchTodos]);

  const addTodo = async (title, content) => {
    setLoading(true);
    setError(null);

    try {
      await axios.post("http://localhost:3000/todo", {
        title,
        content,
      });
      fetchTodos(); // 목록 새로고침
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Something went wrong!");
      console.error("Failed to add todo:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateTodo = async (id, updateFields) => {
    setLoading(true);
    setError(null);

    try {
      await axios.patch(`http://localhost:3000/todo/${id}`, updateFields);
      fetchTodos(); // 목록 새로고침
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Something went wrong!");
      console.error(`Failed to update todo with id ${id}:`, err);
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    setLoading(true);
    setError(null);

    try {
      await axios.delete(`http://localhost:3000/todo/${id}`);
      fetchTodos(); // 목록 새로고침
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Something went wrong!");
      console.error(`Failed to delete todo with id ${id}:`, err);
    } finally {
      setLoading(false);
    }
  };

  return { todos, loading, error, addTodo, updateTodo, deleteTodo };
};
