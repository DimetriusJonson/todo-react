import Navbar from "./composite/Navbar";
import Home from "./pages/Home"
import { BrowserRouter, Routes, Route } from "react-router";
import CreateUser from "./pages/CreateUser";
import Login from "./pages/Login";
import TaskEdit from "./pages/TaskEdit";
import TaskView from "./pages/TaskView";

function App() {
  return (
    <section className="section">
      <div className="is-paddingless">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/createUser" element={<CreateUser />} />
            <Route path="/login" element={<Login />} />
            <Route path="/task/create" element={<TaskEdit mainTitle='Создать задачу' />} />
            <Route path="/task/:id/edit" element={<TaskEdit mainTitle='Редактировать задачу'/>} />
            <Route path="/task/:id" element={<TaskView/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </section>
  );
}

export default App;
