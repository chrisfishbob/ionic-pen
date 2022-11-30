import HomePage from "./pages/home_page/home_page.component";
import LoginPage from "./pages/login_page/login_page.component";
import SignUpPage from "./pages/sign_up_page/sign_up_page.component";
import SearchPage from "./pages/search_page/search_page.component";
import ProfilePage from "./pages/profile_page/profile_page.component";
import CatalogPage from "./pages/catalog_page/catalog_page.component";
import ReadingPage from "./pages/reading_page/reading_page.component";
import BookDetailPage from "./pages/book_detail_page/book_detail_page.component";
import EditBookPage from "./pages/edit_book_page/edit_book_page.component";
import EditChapterPage from "./pages/edit_chapter_page/edit_chapter_page.component";

import NavBar from "./components/navbar/navbar.component";
import Footer from "./components/footer/footer.component";

import Session from "./Session";
import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

function LogoutPage(props) {
  Session.logoutUser();
  props.setLoginStatus(false);
  return <Navigate to="/login" />;
}

function App() {
  const [loggedIn, setLoggedIn] = useState(Session.isLoggedIn());

  return (
    <div>
      <NavBar loggedIn={loggedIn} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={<LoginPage setLoginStatus={setLoggedIn} />}
        />
        <Route
          path="/logout"
          element={<LogoutPage setLoginStatus={setLoggedIn} />}
        />
        <Route
          path="/signup"
          element={<SignUpPage setLoginStatus={setLoggedIn} />}
        />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
        <Route path="/books" element={<CatalogPage />} />
        <Route path="/books/new" element={<EditBookPage />} />
        <Route path="/books/info/:book_id" element={<BookDetailPage />} />
        <Route path="/books/edit/:book_id" element={<EditBookPage />} />
        <Route
          path="/books/read/:book_id"
          element={<ReadingPage loggedIn={loggedIn} />}
        />
        <Route
          path="/books/edit/chapter/:book_id"
          element={<EditChapterPage />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
