import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Typography,
} from "@mui/joy";

import { createBoard } from "../../api/requests";
import { loadExistingBoard } from "../../store/stateManager";

type CreateBoardModal = {
  setCurrentBoard: React.Dispatch<React.SetStateAction<Board | null>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CreateBoardModal: React.FC<CreateBoardModal> = ({
  open,
  setOpen,
  setCurrentBoard,
}) => {
  const dispatch = useDispatch();
  const [boardName, setBoardName] = useState<string | null>(null);
  const [boardID, setBoardID] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function createNewBoard() {
    if (boardName !== null) {
      setLoading(true);
      const newBoardID = await createBoard({
        name: boardName,
        to_do: [],
        in_progress: [],
        done: [],
      });
      const currentBoard = {
        _id: newBoardID,
        name: boardName,
        to_do: [],
        in_progress: [],
        done: [],
      };
      setBoardID(newBoardID);
      setCurrentBoard(currentBoard);
      dispatch(loadExistingBoard(currentBoard));
      setLoading(false);
    }
  }

  const handleClose = (): void => {
    setOpen(false);
    setBoardName(null);
    setBoardID(null);
  };

  return (
    <Modal open={open} onClose={() => handleClose()}>
      <ModalDialog variant="plain">
        <ModalClose />
        <Typography>Board Name</Typography>
        <Input
          disabled={boardID !== null ? true : false}
          fullWidth
          placeholder="Type in here…"
          onChange={(e) => {
            setBoardName(e.target.value);
          }}
        ></Input>
        <Box sx={{ display: `${boardID !== null ? "" : "none"}` }}>
          Please, save this ID to be able to connect to your task board :
          <Typography level="h3">{boardID}</Typography>
        </Box>
        <Button
          loading={loading}
          sx={{ display: `${boardID !== null ? "none" : ""}` }}
          onClick={() => {
            createNewBoard();
          }}
        >
          create
        </Button>
      </ModalDialog>
    </Modal>
  );
};
