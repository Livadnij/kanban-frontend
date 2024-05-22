import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  IconButton,
  Input,
  Tooltip,
  Typography,
  styled,
} from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";

import { CreateBoardModal } from "./createBoardModal";
import { deleteBoard, getBoardById, updateBoard } from "../../api/requests";
import { loadExistingBoard } from "../../store/stateManager";
import { RootState } from "../../store/store";

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [boardID, setBoardID] = useState<string | null>(null);
  const [currentBoard, setCurrentBoard] = useState<Board | null>(null);
  const itemsList = useSelector((state: RootState) => state.globalState);
  const [failedRequest, setFailedRequest] = useState<
    "failed" | "notFound" | "done"
  >("done");
  const [loading, setLoading] = useState<boolean>(false);

  async function LoadExistingBoard() {
    if (boardID !== null && boardID.length === 24) {
      setLoading(true);
      setFailedRequest("done");
      const board = await getBoardById(boardID);
      if (board === null) {
        setFailedRequest("notFound");
        setLoading(false);
        return;
      }
      setCurrentBoard(board);
      dispatch(loadExistingBoard(board));
      setLoading(false);
    } else {
      setFailedRequest("failed");
      setLoading(false);
    }
  }

  function updateTaskBoard(): void {
    updateBoard(itemsList._id, itemsList);
  }

  function deleteBoardHandler(): void {
    const deletedBoardID = deleteBoard(itemsList._id);
    dispatch(
      loadExistingBoard({
        _id: "",
        name: "",
        to_do: [],
        in_progress: [],
        done: [],
      })
    );
    setBoardID(null);
    setCurrentBoard(null);
  }

  return (
    <Box
      sx={{
        overflow: "auto",
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 2,
        flexDirection: "column",
        alignItems: "center",
        "@media (min-width: 780px)": {
          flexDirection: "row",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Tooltip
          arrow
          placement="top"
          open={
            failedRequest === "failed" || failedRequest === "notFound"
              ? true
              : false
          }
          color={failedRequest === "failed" ? "danger" : "neutral"}
          title={
            failedRequest === "failed"
              ? "ID should contain 24 symbols"
              : "Board is not found"
          }
        >
          <Input
            error={failedRequest === "failed" ? true : false}
            sx={{ marginRight: 2, width: "250px" }}
            placeholder="Board ID"
            value={boardID !== null ? boardID : ""}
            onChange={(e) => setBoardID(e.target.value)}
          ></Input>
        </Tooltip>
        <Button
          loading={loading}
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
      <CreateBoardModal
        open={open}
        setOpen={setOpen}
        setCurrentBoard={setCurrentBoard}
      />
    </Box>
  );
};
