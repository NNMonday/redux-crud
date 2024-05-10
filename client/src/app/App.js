import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../screens/Home";
import Add from "../screens/Add";
import StoreProvider from "../redux/store";
import Update from "../screens/Update";

function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </StoreProvider>
    </BrowserRouter>
  );
}

export default App;
