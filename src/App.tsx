import { Box } from "@mui/joy";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Header } from "./components/header/header";
import { KanbanBoard } from "./components/kanbanBoard/kanbanBoard";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Box sx={{ margin: 2, marginLeft: "20px", marginRight: "20px" }}>
        <Header />
        <KanbanBoard />
      </Box>
    </DndProvider>
  );
}

export default App;
