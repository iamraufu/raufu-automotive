import React from 'react';
import logo from '../../../images/logo.svg';
import { NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Navbar = () => {

    const { user } = useAuth();

    return (
        <nav style={{ backgroundColor: '#f3f5f9', boxShadow: '0 5px 15px #c4c4c44d' }} className="navbar navbar-expand-lg customize-navbar sticky-top">
            <div className="container">

                <NavLink className="navbar-brand" to="/">
                    <img src={logo} width={50} style={{transform: 'scaleX(-1)'}} className='img-fluid' alt="logo" /> Raufu Automotive
                </NavLink>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse text-center" id="navbarNavAltMarkup">

                    <div className="navbar-nav ms-auto">
                        <NavLink onClick={() => { window.scrollTo(0, 0); }} style={({ isActive }) => {
                            return {
                                color: isActive ? "red" : "",
                            };
                        }} className="nav-link active" aria-current="page" to="/">Home</NavLink>

                        <NavLink onClick={() => { window.scrollTo(0, 0); }} style={({ isActive }) => {
                            return {
                                color: isActive ? "red" : "",
                            };
                        }} className="nav-link" to="/mechanics">Mechanics</NavLink>

                        {
                            user.email && 
                            <NavLink onClick={() => { window.scrollTo(0, 0); }} style={({ isActive }) => {
                                return {
                                    color: isActive ? "red" : "",
                                };
                            }} className="nav-link" to="/bookings">Bookings</NavLink>
                        }

                        {
                            !user.email && <NavLink onClick={() => { window.scrollTo(0, 0); }} style={({ isActive }) => {
                                return {
                                    color: isActive ? "red" : "",
                                };
                            }} className="nav-link" to="/login">Login</NavLink>
                        }

                        {
                            user.email && <NavLink onClick={() => { window.scrollTo(0, 0); }} style={({ isActive }) => {
                                return {
                                    color: isActive ? "red" : "",
                                };
                            }} className="nav-link" to="/profile">Profile</NavLink>
                        } 
                       

                        {
                            (user.email === 'eftykharrahman@gmail.com') && <NavLink onClick={() => { window.scrollTo(0, 0); }} style={({ isActive }) => {
                                return {
                                    color: isActive ? "red" : "",
                                };
                            }} className="nav-link" to="/dashboard">Dashboard</NavLink>
                        }

                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;