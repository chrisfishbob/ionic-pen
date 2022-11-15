import NavBar from "../../components/navbar/navbar.component";
import Footer from "../../components/footer/footer.component";

import Session from "../../Session";

import { Navigate } from "react-router-dom";

function ProfilePage() {
  if (!Session.isLoggedIn()) {
    return <Navigate to="/login" />;
  }
  return <div>
    <NavBar />
    <h6></h6>
    <Footer />
  </div>
}

export default ProfilePage;