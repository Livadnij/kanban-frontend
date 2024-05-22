import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";

import { RootState } from "../../store/store";
import { changeItemBoard } from "../../store/stateManager";
import { KanbanBoard } from "./kanbanBoard";
import { server } from "../../mocks/server";
import { getBoard200Handler } from "../../mocks/handlers";

const initialState: RootState = {
  globalState: {
    _id: "1",
    name: "Test Board",
    to_do: [{ id: "1", title: "Task 1", description: "Description 1" }],
    in_progress: [{ id: "2", title: "Task 2", description: "Description 2" }],
    done: [{ id: "3", title: "Task 3", description: "Description 3" }],
  },
};

const mockStore = configureStore<Partial<RootState>>();

describe("KanbanBoard", () => {
  let store: MockStoreEnhanced<Partial<RootState>>;

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();
  });

  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <KanbanBoard />
      </Provider>
    );
  };

  it("should render the KanbanBoard with the correct columns", () => {
    server.use(getBoard200Handler);

    renderComponent();

    expect(screen.getByText("To Do")).toBeInTheDocument();
    expect(screen.getByText("In Progress")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();
  });

  it("should call changeItemBoard when dragging and dropping an item", async () => {
    server.use(getBoard200Handler);

    renderComponent();

    const toDoColumn = screen.getByText("To Do");
    const inProgressColumn = screen.getByText("In Progress");

    userEvent.click(screen.getByText('Drag Item', { selector: 'button' }));
    userEvent.click(screen.getByText('Set Origin', { selector: 'button' }));
    userEvent.click(screen.getByText('Drag Over', { selector: 'button' }));
    userEvent.click(screen.getByText('Change Handler', { selector: 'button' }));

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(
        changeItemBoard({
          origin: "to_do",
          destination: "in_progress",
          id: "1",
        })
      );
    });
  });

  it("should not display KanbanBoard if itemsList name is empty", () => {
    const emptyState: RootState = {
      globalState: {
        _id: "",
        name: "",
        to_do: [],
        in_progress: [],
        done: [],
      },
    };
    store = mockStore(emptyState);

    render(
      <Provider store={store}>
        <KanbanBoard />
      </Provider>
    );

    expect(screen.queryByTestId("to_do")).not.toBeInTheDocument();
    expect(screen.queryByTestId("in_progress")).not.toBeInTheDocument();
    expect(screen.queryByTestId("done")).not.toBeInTheDocument();
  });
});
