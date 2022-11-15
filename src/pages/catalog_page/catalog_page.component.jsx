import NavBar from "../../components/navbar/navbar.component";
import Session from "../../Session";
import { Navigate } from "react-router-dom";


function CatalogPage() {
  if (!Session.isLoggedIn()) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <NavBar />
      <h1> Catalog </h1>
    </div>
  );
}

export default CatalogPage;