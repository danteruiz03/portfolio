import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import './header.css';

const Header = () => {
    const route = useSelector(state => state.activeComponent);
    return (
        <div className="header-main">
            <div className="brand"> Dante Ruiz III</div>
            <div className="navigation">
                <Link className={route === "home" ? "active" : ""} to="/">HOME</Link>
                <Link className={route === "task" ? "active" : ""} to="/task">TASK</Link>
                <Link className={route === "calculator" ? "active" : ""} to="/calculator">CALC</Link>
                <Link className={route === "weather" ? "active" : ""} to="/weather">WETR</Link>
            </div>
        </div>
    )
}


export default Header;