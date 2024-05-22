import { Sheet } from "@mui/joy";
import { styled } from "@mui/joy/styles";

export const Item = styled(Sheet)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? theme.palette.background.level1 : "#fff",
    ...theme.typography["body-sm"],
    padding: theme.spacing(1),
    textAlign: "center",
    borderRadius: 4,
    color: theme.vars.palette.text.secondary,
  }));