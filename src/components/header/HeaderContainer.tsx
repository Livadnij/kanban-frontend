import { Box, Button, IconButton, Input, Typography } from "@mui/joy";
import React, { useState } from "react";
import { ModalBoardCreate } from "./ModalBoardCreate";
import { Board, deleteBoard, getBoardById, updateBoard } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { loadExistingBoard } from "../store/Store.StateManager";
import { RootState } from "../store/Store";
import DeleteIcon from "@mui/icons-material/Delete";

export const Header = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [boardID, setBoardID] = useState<string | null>(null);
  const [currentBoard, setCurrentBoard] = useState<Board | null>(null);
  const itemsList = useSelector((state: RootState) => state.globalState);

  async function LoadExistingBoard() {
    if (boardID !== null) {
      const board = await getBoardById(boardID);
      if (board === null) {
        return;
      }
      console.log(board._id);
      setCurrentBoard(board);
      dispatch(loadExistingBoard(board));
    }
  }

  function updateTaskBoard(): void {
    updateBoard(itemsList._id, itemsList);
  }

  function deleteBoardHandler(): void {
    deleteBoard(itemsList._id);
    updateBoard("", {
      _id: "",
      name: "",
      to_do: [],
      in_progress: [],
      done: [],
    });
    setBoardID(null);
    setCurrentBoard(null);
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Input
          sx={{ marginRight: 2, width: "250px" }}
          placeholder="Board ID"
          value={boardID !== null ? boardID : ""}
          onChange={(e) => setBoardID(e.target.value)}
        ></Input>
        <Button
          sx={{ marginRight: 2 }}
          onClick={(e) => {
            LoadExistingBoard();
          }}
        >
          connect
        </Button>
        <Button
          color="success"
          sx={{ display: `${currentBoard !== null ? "" : "none"}` }}
          onClick={() => {
            updateTaskBoard();
          }}
        >
          save
        </Button>
      </Box>
      <Box
        sx={{
          display: { display: `${currentBoard !== null ? "flex" : "none"}` },
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ marginRight: 2 }}>board name :</Typography>
        <Typography sx={{ marginRight: 2 }} level="h2">
          {currentBoard !== null ? currentBoard.name : ""}
        </Typography>
        <IconButton
          onClick={() => {
            deleteBoardHandler();
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
      <Button
        onClick={(e) => {
          setOpen(!open);
        }}
        variant="plain"
      >
        Create new board
      </Button>
      <ModalBoardCreate
        open={open}
        setOpen={setOpen}
        setCurrentBoard={setCurrentBoard}
      />
    </Box>
  );
};
