import axios from "axios";
import { Task } from "../types/Task";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export interface Board {
  _id: string;
  name: string;
  to_do: Task[];
  in_progress: Task[];
  done: Task[];
}

interface BoardCreate {
  name: string;
  to_do: Task[];
  in_progress: Task[];
  done: Task[];
}

// Create a new board
export const createBoard = async (
  board: Omit<BoardCreate, "id">
): Promise<string> => {
  const response = await api.post<{ id: string }>("/boards", board);
  return response.data.id;
};

// Get a board by ID
export const getBoardById = async (id: string): Promise<Board | null> => {
  try {
    const response = await api.get<Board>(`/boards/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching board with ID ${id}:`, error);
    return null;
  }
};

// Update a board
export const updateBoard = async (
  id: string,
  board: Partial<Board>
): Promise<Board> => {
  const response = await api.put<Board>(`/boards/${id}`, board);
  return response.data;
};

// Delete a board
export const deleteBoard = async (id: string): Promise<void> => {
  await api.delete(`/boards/${id}`);
};

export default api;
