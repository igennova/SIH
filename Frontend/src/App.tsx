import React from "react";
import Translator from "./components/Translator";
import Modal from "./components/Modal";
import { BrowserRouter ,Route, Routes} from "react-router-dom";
import Login from "./components/pages/Login/Login";

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
      <Routes>
     
        
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/model" element={<Translator />}></Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}
export default App;
