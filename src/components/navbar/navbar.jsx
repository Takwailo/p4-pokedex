import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ handleLogout }) {
    return (
        <div className="navbars">
            <nav>
                <Link to="/"><h1>PokeDex</h1></Link>
                <Link to="" onClick={handleLogout}>Logout</Link>
                <Link to="/profile">Profile</Link>
            </nav>
        </div>
    );
}
