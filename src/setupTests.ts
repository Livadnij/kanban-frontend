// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

import { server } from "./mocks/server";

import axios from "axios";

axios.interceptors.response.use((response) => {
  debugger;
  if (response.data.error) {
    throw new Error(response.data.error.message);
  }
  return response;
});

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  jest.resetAllMocks();
});
afterAll(() => server.close());
