import React, { useState } from "react";

import { Box, Grid } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";

import { changeItemBoard } from "../../store/stateManager";
import { GridElement } from "../gridElement/gridElement";
import { RootState } from "../../store/store";

export const KanbanBoard: React.FC = () => {
  const dispatch = useDispatch();

  const itemsList = useSelector((state: RootState) => state.globalState);

  const [draggedOver, setDraggedOver] = useState<ItemStatus | null>(null);
  const [dragged, setDragged] = useState<string | null>(null);
  const [origin, setOrigin] = useState<ItemStatus | null>(null);

  const GridChangeHandler = (): void => {
    if (origin && draggedOver && dragged !== null) {
      const item: Item = {
        origin,
        destination: draggedOver,
        id: dragged,
      };
      dispatch(changeItemBoard(item));
    }
  };
  return (
    <Box>
      <Grid
        container
        spacing={2}
        sx={{
          flexDirection: { xs: "column", md: "row" },
          flexGrow: 1,
          display: `${itemsList.name ? "" : "none"}`,
        }}
      >
        <GridElement
          gridChangeHandler={GridChangeHandler}
          columnName="to_do"
          draggedOver={draggedOver}
          setDraggedOver={setDraggedOver}
          setDragged={setDragged}
          setOrigin={setOrigin}
        />
        <GridElement
          gridChangeHandler={GridChangeHandler}
          columnName="in_progress"
          draggedOver={draggedOver}
          setDraggedOver={setDraggedOver}
          setDragged={setDragged}
          setOrigin={setOrigin}
        />
        <GridElement
          gridChangeHandler={GridChangeHandler}
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
