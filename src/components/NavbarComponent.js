import React from "react";
import {Link} from "react-router-dom";

function NavbarComponent() {
    return(
        <nav id="mainNavbar" className="navbar navbar-dark navbar-expand-md py-0">
        <div className="collapse navbar-collapse d-flex justify-content-center">
            <ul className="navbar-nav d-flex justify-content-around" style={{width: "60%"}}>
                <li className="nav-item ">
                <Link exact to='/' className="nav-link ">Home</Link></li>
                <li className="nav-item">
                    <a href="/" class="nav-link ">About</a>
                </li>
                <li className="nav-item navbar-right">
                    <a href="/" className="nav-link">Conctact</a>
                </li>
            </ul>
        </div>
    </nav>
    )
}

export default NavbarComponent;