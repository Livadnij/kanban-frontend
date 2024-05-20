import { Box } from "@mui/joy";
import { Header } from "./components/header/HeaderContainer";
import { BlockContainer } from "./components/blocks/BlockContainer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Box sx={{ margin: 2, marginLeft: "50px", marginRight: "50px" }}>
        <Header />
        <BlockContainer />
      </Box>
    </DndProvider>
  );
}

export default App;
