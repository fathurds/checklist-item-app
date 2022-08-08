import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Items from "./pages/Items";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/items/:id" element={<Items />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
