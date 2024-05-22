import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import { Provider } from "react-redux";

import { testIds } from "../../mock/testIds";
import { Header } from "./header";
import { RootState } from "../../store/store";
import { useItems } from "../gridElement/hooks/useItems";
import { useDragAndDrop } from "../gridElement/hooks/useDragnDrop";
import { server } from "../../mocks/server";
import { createBoard200Handler, getBoard200Handler } from "../../mocks/handlers";

const initialState: RootState = {
  globalState: {
    _id: "1",
    name: "Test Board",
    to_do: [ {id: "1", title: "Task 1", description: "Description 1"} ],
    in_progress: [ {id: "2", title: "Task 2", description: "Description 2"} ],
    done: [ {id: "3", title: "Task 3", description: "Description 3"} ],
  },
};

const mockStore = configureStore<Partial<RootState>>();

describe('Header', () => {

  let store: MockStoreEnhanced<Partial<RootState>>;

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = jest.fn()
  });

  const renderComponent = () => {
    render(
      <Provider store={store}>
        <Header/>
      </Provider>
    )
  }

  it('should render <CreateBoardModal/> on button click', async () => {
    renderComponent();

    const createBoardBtn = screen.getByText('Create new board');

    userEvent.click(createBoardBtn);

    await waitFor(async () => {
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
    });
  });

  it("should create a board", async () => {
    server.use(createBoard200Handler);

    renderComponent();

    const createBoardBtn = screen.getByText("Create new board");
    userEvent.click(createBoardBtn);

    await waitFor(() => {
      expect(screen.getByPlaceholderText("Type in here…")).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText("Type in here…");
    userEvent.type(input, "Test Board");

    const createBtn = screen.getByText("create");
    userEvent.click(createBtn);

    await waitFor( () => {
      expect(screen.getByText("664b4af9ba7e8d2e7b96ea19")).toBeInTheDocument();
    });
  });

  it("should get a board by id", async () => {
    server.use(getBoard200Handler);

    renderComponent();

    const input = screen.getByPlaceholderText("Board ID");
    const connectButton = screen.getByText('connect');

    expect(input).toBeInTheDocument();
    expect(connectButton).toBeInTheDocument();

    userEvent.type(input, '1');
    userEvent.click(connectButton);

    await waitFor(() => {
      const testBoard = screen.getByText('Test Board');
      expect(testBoard).toBeInTheDocument();
    });
  });
})