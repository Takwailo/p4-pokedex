import React from "react";
import { Link } from "react-router-dom";
import { Menu } from 'semantic-ui-react'

export default function Navbar({ handleLogout }) {
    
    return (
        <Menu inverted>
                <Menu.Item position='left'><Link to="/"><h1>PokeDex</h1></Link></Menu.Item>
                <Menu.Item position='right'><Link to="/profile">Profile</Link></Menu.Item>
                {<Menu.Item ><Link to="" onClick={handleLogout}>Logout</Link></Menu.Item>}
            </Menu>
    );
}
