import NavBar from "../../components/navbar/navbar.component";
import Footer from "../../components/footer/footer.component";
import GreyBubble from "../../components/grey_bubble/grey.bubble.component";
import DropDown from "../../components/drop_down/dropdown.component";
import MenuItem from "../../components/menu_item/menu_item.component";
import IonicPenAPI from "../../IonicPenAPI";

import { useState, useEffect } from "react";
import Session from "../../Session";
import { Navigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

function Profile() {
    return (
        <div>
          <NavBar />
          <h4 className="welcome-text"> Welcome {profile.username} </h4>
          <DropdownMenu option="Profile">
            <MenuItem text="Edit Profile" location="" />
            <MenuItem text="Change Password" location="" />
            <MenuItem text="Privacy Settings" location="" />
            <MenuItem text="Delete Account" onClick={} />
            </DropdownMenu>
          <Footer />
        </div>
      );

}

export default Profile;