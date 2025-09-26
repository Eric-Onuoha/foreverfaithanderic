import React, {Fragment, useState} from "react";
import { useNavigate, Outlet } from "react-router-dom";
import "./navigationPreview.styles.scss";

import { Navbar, Nav } from "bootstrap-4-react";
import Monogram from "../../../assets/images/Monogram.png";
import HamburgerMenu from "../../../assets/images/burger-menu.svg";

const NavigationPreview = ({navItems}) => {
    const navigate = useNavigate();
    const [showNav, setShowNav] = useState("navItemsMobile");
    const [navFocus, setNavFocus] = useState(" ");

    const toggleMenu = () => {
        (showNav === "navItemsMobile" ? setShowNav(" ") : setShowNav("navItemsMobile"));
        (navFocus === " " ? setNavFocus("navModal") : setNavFocus(" "));
    }

    const handleNavigation = (e) => {
        toggleMenu();
        navigate("/" + e.target.name);
    }

    return(
    <Fragment>
    <Navbar id="navigationPreviewComponent" expand="lg" light bg="light" fixed="top">
    <Navbar.Brand id="mobileMonogram" href="/"><img id="weddingMonogram" src={Monogram} alt="Wedding Monogram" /></Navbar.Brand>
        <div id={showNav} className="navItemsContainer">
            <Navbar.Brand id="laptopMonogram" href="/"><img id="weddingMonogram" src={Monogram} alt="Wedding Monogram" /></Navbar.Brand>
            <Navbar.Nav id="navItems">
            {navItems.map((navItem) => ( 
                <Nav.ItemLink className="navItem" key={navItem.linkValue} name = {navItem.linkValue} onClick={handleNavigation}>{navItem.navItem}</Nav.ItemLink>
            ))}
            </Navbar.Nav>
        </div>
        <div id={navFocus} onClick={toggleMenu}></div>
        <div className="hamburgerMenu" onClick={toggleMenu}><img src={HamburgerMenu} alt="Menu"/></div>
    </Navbar>
    <Outlet/>
    </Fragment>
    )
};
export default NavigationPreview;