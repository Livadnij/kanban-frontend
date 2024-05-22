import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { editItemValue } from "../../../store/stateManager";

export const useItems = (columnName: ItemStatus | null) => {
  const dispatch = useDispatch();
  const itemsList = useSelector((state: RootState) => state.globalState);

  const getItems = (columnName: ItemStatus | null): Task[] => {
    if (columnName === "to_do") {
      return itemsList.to_do;
    } else if (columnName === "in_progress") {
      return itemsList.in_progress;
    } else if (columnName === "done") {
      return itemsList.done;
    }
    return [];
  };

  const addNewTask = (columnName: ItemStatus | null): void => {
    if (columnName !== null) {
      const date = new Date();
      const isoString = date.toISOString();
      dispatch(
        editItemValue({
          origin: columnName,
          item: {
            id: isoString,
            title: "KanbanTask Title",
            description: "KanbanTask Description",
          },
        })
      );
    }
  };

  return {
    items: getItems(columnName),
    addNewTask,
  } as const;
};
