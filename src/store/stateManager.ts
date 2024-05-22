import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define types for the state
type BoardState = {
  _id: string;
  name: string;
  to_do: Task[];
  in_progress: Task[];
  done: Task[];
};

// Define types for the action payloads
type LoadExistingBoardPayload = {
  _id: string;
  name: string;
  to_do: Task[];
  in_progress: Task[];
  done: Task[];
};

type AddItemPayload = {
  destination: keyof BoardState;
  item: Task;
};

type ChangeItemStatusPayload = {
  origin: ItemStatus;
  destination: ItemStatus;
  id: string;
};

type EditItemValue = {
  item: Task;
  origin: ItemStatus;
};

type DeleteItem = {
  id: string;
  origin: ItemStatus;
};

// Define the initial state with the BoardState type
const initialState: BoardState = {
  _id: "",
  name: "",
  to_do: [],
  in_progress: [],
  done: [],
};

const GlobalState = createSlice({
  name: "globalState",
  initialState,
  reducers: {
    loadExistingBoard: (
      state,
      action: PayloadAction<LoadExistingBoardPayload>
    ) => {
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.to_do = action.payload.to_do;
      state.in_progress = action.payload.in_progress;
      state.done = action.payload.done;
    },
    addItem: (state, action: PayloadAction<AddItemPayload>) => {
      if (
        action.payload.destination !== "_id" &&
        action.payload.destination !== "name"
      ) {
        state[action.payload.destination].push(action.payload.item);
      }
    },
    changeItemBoard: (
      state,
      action: PayloadAction<ChangeItemStatusPayload>
    ) => {
      const { origin, destination, id } = action.payload;
      const itemIndex = state[origin].findIndex((task) => task.id === id);
      if (itemIndex === -1) return; // Item not found, exit early
      const [item] = state[origin].splice(itemIndex, 1);
      state[destination].push(item);
    },
    editItemValue: (state, action: PayloadAction<EditItemValue>) => {
      const { item, origin } = action.payload;
      const itemIndex = state[origin].findIndex((task) => task.id === item.id);
      if (itemIndex === -1) {
        const arreyLength = state[origin].length;
        state[origin][arreyLength] = item;
      }
      state[origin][itemIndex] = item;
    },
    deleteItem: (state, action: PayloadAction<DeleteItem>) => {
      const { origin, id } = action.payload;
      const itemIndex = state[origin].findIndex((task) => task.id === id);
      if (itemIndex === -1) return;
      state[origin].splice(itemIndex, 1);
    },
  },
});

export default GlobalState.reducer;
export const {
  deleteItem,
  changeItemBoard,
  addItem,
  loadExistingBoard,
  editItemValue,
} = GlobalState.actions;
