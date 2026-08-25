import { Routes,Route } from "react-router-dom";
import ProtectedRoute from "./components/protechtedRoute";
import AdminRoute from "./components/AdminRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Notes from "./pages/Notes";
import Dashboard from "./pages/DashBoard";
import NotesDetails from "./pages/NotesDetails";
import Register from "./pages/Register";
import Navbar from "./components/navBar";

function App(){
  return(
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/> 

      <Route path="/login" element={<Login/>}/>

      <Route path="/register" element={<Register/>}/>

       <Route element={<ProtectedRoute />}>

      <Route path="/notes" element={<Notes/>}/>

      <Route path="/notes/:id" element={<NotesDetails />} />
      </Route>

      <Route element={<AdminRoute />}>

      <Route path="/Dashboard" element={<Dashboard />}/>
      
      </Route>

    </Routes>
    </>
  );
}
export default App;