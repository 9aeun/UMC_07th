import { createContext, useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch"; // Custom fetch 훅

export const TodoContext = createContext();

export default function TodoContextProvider({ children }) {
  const { request, loading, error } = useFetch(); // Custom fetch 훅
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 전체 Todo 목록 조회
  const fetchTodos = async (query = "") => {
    try {
      const url = query ? `http://localhost:3000/todo?title=${query}` : "http://localhost:3000/todo";
      const [data] = await request(url, { method: "GET" });
      setTodos(data);
    } catch (err) {
      console.error("Todo 목록 불러오기 실패:", err);
    }
  };

  // 개별 Todo 조회
  const fetchTodoById = async (id) => {
    try {
      const data = await request(`http://localhost:3000/todo/${id}`, { method: "GET" });
      return data;
    } catch (err) {
      console.error(`Todo ${id} 조회 실패:`, err);
    }
  };

  // Todo 추가
  const addTodo = async () => {
    if (!title.trim() || !content.trim()) return;
    try {
      const newTodo = await request("http://localhost:3000/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      setTodos((prev) => [...prev, newTodo]);
      setTitle("");
      setContent("");
    } catch (err) {
      console.error("Todo 추가 실패:", err);
    }
  };

  // Todo 수정
  const updateTodo = async (id, title, content, checked) => {
  try {
    // 서버에 보낼 데이터
    const updateFields = {
      title,
      content,
      checked,
    };

    // PATCH 요청
    const response = await fetch(`http://localhost:3000/todo/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateFields),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const updatedTodo = await response.json();

    // Todo 목록 업데이트
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, ...updatedTodo } : todo))
    );

    console.log(`${id}번 Todo가 수정되었습니다.`);
  } catch (error) {
    console.error("Todo 수정 실패:", error);
  }
};


  

  // Todo 삭제
  const deleteTodo = async (id) => {
    try {
      await request(`http://localhost:3000/todo/${id}`, { method: "DELETE" });
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error(`Todo ${id} 삭제 실패:`, err);
    }
  };

  useEffect(() => {
    fetchTodos(); // 초기 로드
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todos,
        title,
        setTitle,
        content,
        setContent,
        addTodo,
        fetchTodoById,
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
