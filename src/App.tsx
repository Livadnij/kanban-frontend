import { Box } from "@mui/joy";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

import { Header } from "./components/header/header";
import { KanbanBoard } from "./components/kanbanBoard/kanbanBoard";

function App() {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  const Backend = isMobile ? TouchBackend : HTML5Backend;

  return (
    <DndProvider backend={Backend}>
      <Box sx={{ margin: 2, marginLeft: "20px", marginRight: "20px" }}>
        <Header />
        <KanbanBoard />
      </Box>
    </DndProvider>
  );
}

export default App;
