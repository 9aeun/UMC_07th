import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

const fetchTodos = async (search = "") => {
  const query = search ? `?title=${encodeURIComponent(search)}` : "";
  const response = await axios.get(`http://localhost:3000/todo${query}`);
  return Array.isArray(response.data) && Array.isArray(response.data[0])
    ? response.data[0]
    : response.data;
};

const fetchTodoById = async (id) => {
  const response = await axios.get(`http://localhost:3000/todo/${id}`);
  return response.data;
};

const addTodo = async ({ title, content }) => {
  await axios.post("http://localhost:3000/todo", { title, content });
};

const updateTodo = async ({ id, updateFields }) => {
  await axios.patch(`http://localhost:3000/todo/${id}`, updateFields);
};

const deleteTodo = async (id) => {
  await axios.delete(`http://localhost:3000/todo/${id}`);
};

export const useTodo = (searchTerm) => {
  const queryClient = useQueryClient();

  // Todos 가져오기
  const { data: todos = [], isLoading, error } = useQuery(
    ["todos", searchTerm],
    () => fetchTodos(searchTerm),
    {
      keepPreviousData: true,
    }
  );

  // Todo 추가
  const addTodoMutation = useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  // Todo 업데이트
  const updateTodoMutation = useMutation(updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  // Todo 삭제
  const deleteTodoMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  return {
    todos,
    isLoading,
    error,
    fetchTodoById,
    addTodo: addTodoMutation.mutate,
    updateTodo: updateTodoMutation.mutate,
    deleteTodo: deleteTodoMutation.mutate,
  };
};
