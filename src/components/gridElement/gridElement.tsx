import React from "react";
import { Grid, Box, Typography, IconButton, Divider, Stack } from "@mui/joy";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useDragAndDrop } from "./hooks/useDragnDrop";
import { useItems } from "./hooks/useItems";
import { KanbanTask } from "../kanbanTask";
import { Item } from "../item.style";

export type GridElementProps = {
  gridChangeHandler: () => void;
  columnName: ItemStatus | null;
  draggedOver: ItemStatus | null;
  setDraggedOver: React.Dispatch<React.SetStateAction<ItemStatus | null>>;
  setDragged: React.Dispatch<React.SetStateAction<string | null>>;
  setOrigin: React.Dispatch<React.SetStateAction<ItemStatus | null>>;
};

export const GridElement: React.FC<GridElementProps> = ({
  setOrigin,
  gridChangeHandler,
  columnName,
  draggedOver,
  setDraggedOver,
  setDragged,
}) => {
  const { items, addNewTask } = useItems(columnName);
  const { dragEndHandler, dragOverHandler, dragDropHandler } = useDragAndDrop(
    setDraggedOver,
    setDragged,
    gridChangeHandler
  );

  const columnNameEditor = (columnName: ItemStatus | null): string => {
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

  return (
    <Grid
      xs
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
            <Typography level="h2">{columnNameEditor(columnName)}</Typography>
            <IconButton onClick={() => addNewTask(columnName)}>
              <AddCircleIcon />
            </IconButton>
          </Box>
          <Divider />
          <Stack sx={{ paddingTop: 2 }} spacing={2}>
            {items.map((item) => (
              <KanbanTask
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
};
