import HomePage from "./pages/home_page/home_page.component";
import LoginPage from "./pages/login_page/login_page.component";
import SearchPage from "./pages/search_page/search_page.component";
import ProfilePage from"./pages/profile_page/profile_page.component";
import CatalogPage from "./pages/catalog_page/catalog_page.component";
import BookDetailPage from "./pages/book_detail_page/book_detail_page.component";

import Session from "./Session";

import { Route, Routes, Navigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

function LogoutPage() {
  Session.logoutUser();
  return <Navigate to="/login" />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/logout" element={<LogoutPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/book/:book_id" element={<BookDetailPage />} />
    </Routes>
  );
}

export default App;
