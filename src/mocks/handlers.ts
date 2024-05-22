import { rest } from "msw";
import {
  createBoardSuccessfulResponse,
  deleteBoardSuccessfulResponse,
  getBoardSuccessfulResponse,
  updateBoardSuccessfulResponse
} from "./responses";


export const createBoard200Handler = rest.post(
  '/boards',
  (req, res, ctx) => {
    debugger;
    return res(ctx.status(200), ctx.json(createBoardSuccessfulResponse));
  }
);

export const createBoard500Handler = rest.post(
  '/boards',
  (req, res, ctx) => {
    return res(ctx.status(500));
  }
);

export const getBoard200Handler = rest.get(
  '/boards/:id',
  (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getBoardSuccessfulResponse));
  }
);

export const getBoard500Handler = rest.get(
  '/boards/:id',
  (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ message: "Internal Server Error" }),
    );
  }
);

export const getBoard404Handler = rest.get(
  '/boards/:id',
  (req, res, ctx) => {
    return res(ctx.status(404));
  }
);

export const updateBoard200Handler = rest.put(
  '/boards/:id',
  (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(updateBoardSuccessfulResponse));
  }
);

export const updateBoard500Handler = rest.put(
  '/boards/:id',
  (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ message: "Internal Server Error" }),
    );
  }
);

export const updateBoard404Handler = rest.put(
  '/boards/:id',
  (req, res, ctx) => {
    return res(ctx.status(404));
  }
);


export const deleteBoard200Handler = rest.delete(
  '/boards/:id',
  (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(deleteBoardSuccessfulResponse));
  }
);

export const deleteBoard500Handler = rest.delete(
  '/boards/:id',
  (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ message: "Internal Server Error" }),
    );
  }
);

export const deleteBoard404Handler = rest.delete(
  '/boards/:id',
  (req, res, ctx) => {
    return res(ctx.status(404));
  }
);

export const defaultHandlers = [
  createBoard200Handler,
  createBoard500Handler,
  getBoard200Handler,
  getBoard500Handler,
  getBoard404Handler,
  updateBoard200Handler,
  updateBoard500Handler,
  updateBoard404Handler,
  deleteBoard200Handler,
  deleteBoard500Handler,
  deleteBoard404Handler,
];

