import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore, { MockStoreEnhanced } from "redux-mock-store"
import { useItems } from "./hooks/useItems";
import { useDragAndDrop } from "./hooks/useDragnDrop";
import { RootState } from "../../store/store";
import { GridElement, GridElementProps } from "./gridElement";
import userEvent from "@testing-library/user-event";

jest.mock("./hooks/useItems");
jest.mock("./hooks/useDragnDrop");


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

describe("GridElement", () => {
  let store: MockStoreEnhanced<Partial<RootState>>;

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();

    (useItems as jest.Mock).mockReturnValue({
      items: initialState.globalState.to_do,
      addNewTask: jest.fn(),
    });

    (useDragAndDrop as jest.Mock).mockReturnValue({
      dragEndHandler: jest.fn(),
      dragOverHandler: jest.fn(),
      dragDropHandler: jest.fn(),
    });
  });

  const renderComponent = (props: GridElementProps) => {
    return render(
      <Provider store={store}>
        <GridElement {...props} />
      </Provider>
    );
  };

  it("should render column name correctly", () => {
    renderComponent({
      setOrigin: jest.fn(),
      gridChangeHandler: jest.fn(),
      columnName: "to_do",
      draggedOver: null,
      setDraggedOver: jest.fn(),
      setDragged: jest.fn(),
    });

    expect(screen.getByText("To Do")).toBeInTheDocument();
  });

  it("should call addNewTask when add button is clicked", () => {
    const mockAddNewTask = jest.fn();
    (useItems as jest.Mock).mockReturnValueOnce({
      items: initialState.globalState.to_do,
      addNewTask: mockAddNewTask,
    });

    renderComponent({
      setOrigin: jest.fn(),
      gridChangeHandler: jest.fn(),
      columnName: "to_do",
      draggedOver: null,
      setDraggedOver: jest.fn(),
      setDragged: jest.fn(),
    });

    userEvent.click(screen.getAllByRole("button")[0]);

    expect(mockAddNewTask).toHaveBeenCalledWith("to_do");
  });

  it("should render tasks correctly", () => {
    renderComponent({
      setOrigin: jest.fn(),
      gridChangeHandler: jest.fn(),
      columnName: "to_do",
      draggedOver: null,
      setDraggedOver: jest.fn(),
      setDragged: jest.fn(),
    });

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Description 1")).toBeInTheDocument();
  });

  it("should handle drag and drop events", () => {
    const mockDragEndHandler = jest.fn();
    const mockDragOverHandler = jest.fn();
    const mockDragDropHandler = jest.fn();

    (useDragAndDrop as jest.Mock).mockReturnValueOnce({
      dragEndHandler: mockDragEndHandler,
      dragOverHandler: mockDragOverHandler,
      dragDropHandler: mockDragDropHandler,
    });

    renderComponent({
      setOrigin: jest.fn(),
      gridChangeHandler: jest.fn(),
      columnName: "to_do",
      draggedOver: null,
      setDraggedOver: jest.fn(),
      setDragged: jest.fn(),
    });

    const gridElement = screen.getByText("To Do")

    fireEvent.dragOver(gridElement);
    fireEvent.dragEnd(gridElement);
    fireEvent.drop(gridElement);

    expect(mockDragOverHandler).toHaveBeenCalled();
    expect(mockDragEndHandler).toHaveBeenCalled();
    expect(mockDragDropHandler).toHaveBeenCalled();
  });
});
