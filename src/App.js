import Navbar from "./composite/Navbar";
import Home from "./pages/Home"
import { BrowserRouter, Routes, Route } from "react-router";
import CreateUser from "./pages/CreateUser";
import Login from "./pages/Login";

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
          </Routes>
        </BrowserRouter>
      </div>
    </section>
  );
}

export default App;
