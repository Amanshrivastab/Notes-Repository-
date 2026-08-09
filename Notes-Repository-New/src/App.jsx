import { Routes,Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Notes from "./pages/Notes";
import Dashboard from "./pages/Dashboard";
import NotesDetails from "./pages/NotesDetails";
import Register from "./pages/Register";

function App(){
  return(
    <Routes>
      <Route path="/" element={<Home/>}/> 

      <Route path="/login" element={<Login/>}/>

      <Route path="/register" element={<Register/>}/>

      <Route path="/notes" element={<Notes/>}/>

      <Route path="/notes/:id" element={<NotesDetails />} />

      <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
  );
}
export default App;