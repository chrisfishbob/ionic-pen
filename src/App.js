import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/home/home.component";
import Login from "../src/pages/login_page/login.component";
import BookDetail from "./components/book_detail/book_detail.component";
import { Route, Routes, Navigate } from "react-router-dom";
import Session from "./Session";

function Logout() {
  Session.logoutUser();
  return <Navigate to="/login" />;
}

function Catalog() {
  if (!Session.isLoggedIn()) {
    return <Navigate to="/login" />;
  }
  return <h1>Catalog</h1>;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/book-details" element={<BookDetail />} />
      <Route path="/book/:book_id" element={<BookDetail />} />
    </Routes>
  );
}

export default App;
