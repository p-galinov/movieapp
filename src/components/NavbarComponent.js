import React from "react";
import {Link} from "react-router-dom";

function NavbarComponent() {
    return(
        <nav id="mainNavbar" class="navbar navbar-dark navbar-expand-md py-0">
        <div class="collapse navbar-collapse d-flex justify-content-around">
            <ul class="navbar-nav">
                <li className="nav-item"><Link exact to='/' className="nav-link">Home</Link></li>

                <li class="nav-item">
                    <a href="/" class="nav-link ">About</a>
                </li>
                <li class="nav-item navbar-right">
                    <a href="/" class="nav-link">Conctact</a>
                </li>
            </ul>
       
        </div>
    </nav>
    )
}

export default NavbarComponent;