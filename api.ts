import { ITasks } from "./types/tasks";

const BASE_URL = "http://localhost:5000";

export const getAllTodos = async (): Promise<ITasks[]> => {
  const res = await fetch(`${BASE_URL}/tasks`);
  const todos = res.json();
  return todos;
};
