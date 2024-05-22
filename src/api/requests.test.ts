import { createBoard, deleteBoard, getBoardById, updateBoard } from "./requests";
import {
  createBoardSuccessfulResponse, deleteBoardSuccessfulResponse,
  getBoardSuccessfulResponse,
  updateBoardSuccessfulResponse
} from "../mocks/responses";
import { server } from "../mocks/server";
import {
  createBoard500Handler, deleteBoard404Handler, deleteBoard500Handler,
  getBoard404Handler,
  getBoard500Handler, updateBoard200Handler, updateBoard404Handler,
  updateBoard500Handler
} from "../mocks/handlers";

const mockBoard: Partial<Board> = {
  name: 'mockBoard',
  to_do: [],
  in_progress: [],
  done: []
};

const mockBoardWithId: Partial<Board> = {
  _id: '2',
  name: 'mockBoard',
  to_do: [],
  in_progress: [],
  done: []
};

describe("createBoard", () => {
  it("createBoard creates a board successfully", async () => {
    const response = await createBoard(mockBoard);
    expect(response).toEqual(createBoardSuccessfulResponse.id);
  });

  it("handles 500 Internal Server Error", async () => {
    server.use(createBoard500Handler);
    await expect(createBoard(mockBoard)).rejects.toThrow(
      "Request failed with status code 500"
    );
  });
});

describe("getBoardById", () => {
  it("createBoard creates a board successfully", async () => {
    const response = await getBoardById('1');
    expect(response).toEqual(getBoardSuccessfulResponse);
  });

  it('handles 500 Internal Server Error', async () => {
    server.use(getBoard500Handler);
    await expect(getBoardById('1')).rejects.toThrow('Request failed with status code 500');
  });

  it('handles 404 Error', async () => {
    server.use(getBoard404Handler);
    await expect(getBoardById('123123')).rejects.toThrow('Request failed with status code 404');
  });
});

describe("updateBoard", () => {
  it("updateBoard updates a board successfully", async () => {
    server.use(updateBoard200Handler);
    const response = await updateBoard('1', mockBoardWithId);
    expect(response).toEqual(updateBoardSuccessfulResponse);
  });

  it('handles 500 Internal Server Error', async () => {
    server.use(updateBoard500Handler);
    await expect(updateBoard('2', mockBoardWithId)).rejects.toThrow('Request failed with status code 500');
  });

  it('handles 404 Error', async () => {
    server.use(updateBoard404Handler);
    await expect(updateBoard('2', mockBoardWithId)).rejects.toThrow('Request failed with status code 404');
  });
});

describe("deleteBoard", () => {
  it("deleteBoard deletes a board successfully", async () => {
    const response = await deleteBoard('1');
    expect(response).toEqual(deleteBoardSuccessfulResponse.id);
  });

  it('handles 500 Internal Server Error', async () => {
    server.use(deleteBoard500Handler);
    await expect(deleteBoard('1')).rejects.toThrow('Request failed with status code 500');
  });

  it('handles 404 Error', async () => {
    server.use(deleteBoard404Handler);
    await expect(deleteBoard('werwrwe')).rejects.toThrow('Request failed with status code 404');
  });
});