import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/home/home.component";
import BookDetail from './components/book_detail/book_detail.component';
import { Route, Routes } from "react-router-dom";


function Catalog() {
  return <h1>Catalog</h1>;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/book-details" element={<BookDetail />} />
    </Routes>
  );
}

export default App;
