import React from "react";
import Translator from "./components/Translator";
import Modal from "./components/Modal";
import { BrowserRouter ,Route, Routes} from "react-router-dom";
import Login from "./components/pages/Login/Login";
import Register from "./components/pages/register";
import Home from "./components/pages/Home/Home";
import Convert from "./secondfeature/pages/LearnSign";

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
      <Routes>
     
        <Route path="/" element={<Home/>}></Route>
        <Route path="/convertor" element={<Convert/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/model" element={<Translator />}></Route>
        <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}
export default App;
