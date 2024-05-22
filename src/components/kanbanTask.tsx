import { Box, Chip, IconButton, Input, Tooltip, Typography } from "@mui/joy";
import { Item } from "./item.style";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { deleteItem, editItemValue } from "../store/stateManager";
import { useDispatch } from "react-redux";

type ColumnName = ItemStatus;

type KanbanTaskProps = {
  columnName: ColumnName | null;
  item: Task;
  setOrigin: React.Dispatch<React.SetStateAction<ItemStatus | null>>;
  setDragged: React.Dispatch<React.SetStateAction<string | null>>;
};

export function KanbanTask({
  setOrigin,
  columnName,
  item,
  setDragged,
}: KanbanTaskProps) {
  const dispatch = useDispatch();
  const [editItem, setEditItem] = useState<boolean>(false);
  const [itemValue, setItemValue] = useState<Task | null>(null);

  useEffect(() => {
    setItemValue(item);
  }, [item]);

  const dragStartHandler = (item: Task) => {
    setDragged(item.id);
    setOrigin(columnName);
  };

  const dateReader = (isoDate: string): string => {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const timeReader = (isoDate: string): string => {
    const date = new Date(isoDate);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const editTask = (taskField: string, value: string): void => {
    if (itemValue && columnName !== null) {
      const task: Task = {
        id: itemValue.id,
        title: `${taskField === "title" ? value : itemValue.title}`,
        description: `${
          taskField === "description" ? value : itemValue.description
        }`,
      };
      dispatch(editItemValue({ origin: columnName, item: task }));
    }
  };

  const deleteTask = (): void => {
    if (itemValue && columnName !== null) {
      dispatch(deleteItem({ origin: columnName, id: itemValue.id }));
    }
  };

  return (
    <Item
      className={item.id.toString()}
      onDragStart={(e) => dragStartHandler(item)}
      draggable
      sx={{
        padding: "20px",
        border:
          "1px solid rgba(var(--joy-palette-neutral-mainChannel, 99 107 116) / 0.2)",
        borderRadius: "8px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Input
          sx={{ display: `${editItem ? "" : "none"}` }}
          value={itemValue !== null ? itemValue.title : ""}
          onChange={(e) => {
            editTask("title", e.target.value);
          }}
        />
        <Typography sx={{ display: `${editItem ? "none" : ""}` }}>
          {item.title}
        </Typography>
        <Tooltip title={timeReader(item.id)} variant="soft">
          <Chip sx={{ height: 32 }} variant="outlined">
            {dateReader(item.id)}
          </Chip>
        </Tooltip>
      </Box>
      <Input
        sx={{ display: `${editItem ? "" : "none"}` }}
        value={itemValue !== null ? itemValue.description : ""}
        onChange={(e) => {
          editTask("description", e.target.value);
        }}
      />
      <Box
        sx={{
          textAlign: "left",
          paddingTop: 1,
          display: `${editItem ? "none" : ""}`,
        }}
      >
        {item.description}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Tooltip title="Edit" variant="soft">
          <IconButton>
            <EditIcon
              onClick={() => {
                setEditItem(!editItem);
              }}
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete" variant="soft">
          <IconButton>
            <DeleteIcon
              onClick={() => {
                deleteTask();
              }}
            />
          </IconButton>
        </Tooltip>
      </Box>
    </Item>
  );
}
