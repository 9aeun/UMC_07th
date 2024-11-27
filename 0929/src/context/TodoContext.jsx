import { createContext, useState, useEffect, useCallback } from "react";
import { useFetch } from "../hooks/useFetch";

export const TodoContext = createContext();

export default function TodoContextProvider({ children }) {
  const { request, loading, error } = useFetch();
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // fetchTodos를 useCallback으로 안정화
  const fetchTodos = useCallback(
    async (search = "") => {
      try {
        const query = search ? `?title=${encodeURIComponent(search)}` : "";
        const response = await request(`http://localhost:3000/todo${query}`, {
          method: "GET",
        });
        setTodos(response || []);
      } catch (err) {
        console.error("Todo 목록 불러오기 실패:", err);
      }
    },
    [request] // request 참조를 의존성으로 추가
  );

  useEffect(() => {
    fetchTodos(); // 초기 렌더링 시 호출
  }, [fetchTodos]);

  const addTodo = async () => {
    if (!title.trim() || !content.trim()) return;
    try {
      await request("http://localhost:3000/todo", {
        method: "POST",
        body: JSON.stringify({ title, content }),
      });
      await fetchTodos();
      setTitle("");
      setContent("");
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
      await fetchTodos();
    } catch (err) {
      console.error(`Failed to update todo with id ${id}:`, err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await request(`http://localhost:3000/todo/${id}`, { method: "DELETE" });
      await fetchTodos();
    } catch (err) {
      console.error(`Failed to delete todo with id ${id}:`, err);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        title,
        setTitle,
        content,
        setContent,
        addTodo,
        updateTodo,
        deleteTodo,
        fetchTodos,
        loading,
        error,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
