import React from "react";
import Translator from "./components/Translator";
import Modal from "./components/Modal";
import { BrowserRouter ,Route, Routes} from "react-router-dom";
import Login from "./components/pages/Login/Login";
import Register from "./components/pages/register";
import Convert from "./secondfeature/pages/LearnSign";
import Home from "../src/components/pages/Home/Home";
import Video from "./components/data/data";
import Event from "./components/data/Event";
import VideotoText from "./components/videototext/video1";
import SetAvatar from "./components/pages/setavatar/setavatar";
import TeacherPage from "./components/teacher/teacher";
// import MathGame from "./components/game";
function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
      <Routes>
     
        <Route path="/" element={<Home/>}></Route>
        <Route path="/test" element={<Convert/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/model" element={<Translator />}></Route>
        <Route path="/register" element={<Register />} />
        <Route path="/data" element={<Video/>}></Route>
        <Route path="/folder/:folderId" element={<Video/>}></Route>
        <Route path="/events" element={<Event/>}></Route>
        <Route path="/video" element={<VideotoText/>}></Route>
        <Route path="/teacher" element={<TeacherPage/>}></Route>

        {/* <Route path="/setavatar" element={<SetAvatar/>}></Route> */}
        {/* <Route path="/game" element={<MathGame/>}></Route> */}
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}
export default App;
