import React from 'react';
import './NotFound.css';
import Navbar from '../Navbar/Navbar';

const NotFound = () => {
    return (
        <div className="bg-brand bg-brand-container not-found-container">
            <Navbar />
            {/* <h1 className='fw-bold text-center text-danger mt-5 pt-5'>404 <br />Not Found</h1> */}
        </div>
    );
};

export default NotFound;