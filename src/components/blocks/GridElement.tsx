import { Box, Divider, Grid, IconButton, Stack, Typography } from "@mui/joy";
import React from "react";
import { Item } from "./Item.style";
import { ItemElement } from "./ItemElement";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/Store";
import { ItemState, Task } from "../../types/Task";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { editItemValue } from "../store/Store.StateManager";

type GridElementType = {
  GridChangeHandler: () => void;
  columnName: ItemState | null;
  draggedOver: ItemState | null;
  setDraggedOver: React.Dispatch<React.SetStateAction<ItemState | null>>;
  setDragged: React.Dispatch<React.SetStateAction<string | null>>;
  setOrigin: React.Dispatch<React.SetStateAction<ItemState | null>>;
};

interface BoardState {
  _id: String;
  name: String;
  to_do: Task[];
  in_progress: Task[];
  done: Task[];
}

export function GridElement({
  setOrigin,
  GridChangeHandler,
  columnName,
  draggedOver,
  setDraggedOver,
  setDragged,
}: GridElementType) {
  const dispatch = useDispatch();
  const itemsList = useSelector((state: RootState) => state.globalState);
  const getItems = (
    columnName: ItemState | null,
    itemsList: BoardState
  ): Task[] => {
    if (columnName === "to_do") {
      return itemsList.to_do;
    } else if (columnName === "in_progress") {
      return itemsList.in_progress;
    } else if (columnName === "done") {
      return itemsList.done;
    }
    // Return an empty array as a fallback (or handle this case as needed)
    return [];
  };

  function dragEndHandler() {
    setDraggedOver(null);
  }

  function dragOverHandler(e: React.DragEvent, item: ItemState | null) {
    e.preventDefault();
    setDraggedOver(item);
  }

  function dragDropHandler(e: React.DragEvent, item: ItemState | null) {
    e.preventDefault();
    GridChangeHandler();
    setDraggedOver(null);
  }

  const ColumnNameEditor = (columnName: ItemState | null): string => {
    switch (columnName) {
      case "to_do":
        return "To Do";
      case "in_progress":
        return "In Progress";
      case "done":
        return "Done";
      default:
        return "none";
    }
  };

  function addNewTask(columnName: ItemState | null): void {
    if (columnName !== null) {
      console.log(itemsList[columnName]);
      const date = new Date();
      const isoString = date.toISOString();
      dispatch(
        editItemValue({
          origin: columnName,
          item: {
            id: isoString,
            title: "Task Title",
            description: "Task Description",
          },
        })
      );
    }
  }

  return (
    <Grid
      xs={4}
      onDragOver={(e) => dragOverHandler(e, columnName)}
      onDragEnd={dragEndHandler}
      onDrop={(e) => dragDropHandler(e, columnName)}
    >
      <Item
        sx={{ backgroundColor: draggedOver === columnName ? "#32383E" : "" }}
      >
        <Box>
          <Box
            sx={{
              padding: "0px 10px 10px 10px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography level="h2">{ColumnNameEditor(columnName)}</Typography>
            <IconButton
              onClick={() => {
                addNewTask(columnName);
              }}
            >
              <AddCircleIcon />
            </IconButton>
          </Box>
          <Divider />
          <Stack sx={{ paddingTop: 2 }} spacing={2}>
            {getItems(columnName, itemsList)?.map((item) => (
              <ItemElement
                columnName={columnName}
                key={item.id}
                setOrigin={setOrigin}
                setDragged={setDragged}
                item={item}
              />
            ))}
          </Stack>
        </Box>
      </Item>
    </Grid>
  );
}
