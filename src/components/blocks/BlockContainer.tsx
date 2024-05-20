"use clients";
import React, { useState } from "react";
import { Box, Grid } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { changeItemBoard } from "../store/Store.StateManager";
import { GridElement } from "./GridElement";
import { ItemState } from "../../types/Task";
import { RootState } from "../store/Store";

type Item = {
  origin: ItemState;
  destination: ItemState;
  id: string;
};

// Component
export const BlockContainer: React.FC = () => {
  const dispatch = useDispatch();

  const itemsList = useSelector((state: RootState) => state.globalState);

  const [draggedOver, setDraggedOver] = useState<ItemState | null>(null);
  const [dragged, setDragged] = useState<string | null>(null);
  const [origin, setOrigin] = useState<ItemState | null>(null);

  console.log(draggedOver, dragged);

  const GridChangeHandler = (): void => {
    if (origin && draggedOver && dragged !== null) {
      const item: Item = {
        origin,
        destination: draggedOver,
        id: dragged,
      };
      console.log(item);
      dispatch(changeItemBoard(item));
    }
  };
  return (
    <Box>
      <Grid
        container
        spacing={2}
        sx={{ flexGrow: 1, display: `${itemsList.name ? "" : "none"}` }}
      >
        <GridElement
          GridChangeHandler={GridChangeHandler}
          columnName="to_do"
          draggedOver={draggedOver}
          setDraggedOver={setDraggedOver}
          setDragged={setDragged}
          setOrigin={setOrigin}
        />
        <GridElement
          GridChangeHandler={GridChangeHandler}
          columnName="in_progress"
          draggedOver={draggedOver}
          setDraggedOver={setDraggedOver}
          setDragged={setDragged}
          setOrigin={setOrigin}
        />
        <GridElement
          GridChangeHandler={GridChangeHandler}
          columnName="done"
          draggedOver={draggedOver}
          setDraggedOver={setDraggedOver}
          setDragged={setDragged}
          setOrigin={setOrigin}
        />
      </Grid>
    </Box>
  );
};
