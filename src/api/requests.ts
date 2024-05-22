import axios from "axios";
import { debug } from "node:util";

// Create a new board
export const createBoard = async (board: Partial<Board>): Promise<string> => {
  const response = await axios.post<CreatedBoardResponse>("/boards", board);
  return response.data.id;
};

// Get a board by ID
export const getBoardById = async (id: string): Promise<Board | null> => {
  try {
    const response = await axios.get<Board>(`/boards/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching board with ID ${id}:`, error);
    throw error;
  }
};

// Update a board
export const updateBoard = async (
  id: string,
  board: Partial<Board>
): Promise<Board> => {
  const response = await axios.put<Board>(`/boards/${id}`, board);
  return response.data;
};

// Delete a board
export const deleteBoard = async (id: string): Promise<String | null> => {
  try {
    const response = await axios.delete(`/boards/${id}`);
    return response.data.id;
  } catch (error) {
    console.error(`Error deleting board with ID ${id}:`, error);
    // throw error;
    return null;
  }
};
