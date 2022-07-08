import React, { useEffect, useState } from 'react';
// import mechanics from '../../data/mechanicData.json';
import Navbar from '../Shared/Navbar/Navbar';
import { useNavigate, Link } from 'react-router-dom';
// import { addToBookings } from '../../utilities/bookingUtilities';
import logo from '../../images/logo.svg';

const Mechanics = () => {

    const navigate = useNavigate();

    // handle bookings where each mechanic is allowed to get assign on maximum of 4 bookings per day
    // const handleBookings = (mechanic) => {
    //     const mechanicBookings = mechanic.bookings;
    //     const mechanicBookingsCount = mechanicBookings.length;
    //     const mechanicBookingsCountPerDay = mechanicBookings.filter(booking => booking.date === new Date().toLocaleDateString()).length;
    //     if (mechanicBookingsCountPerDay < 4) {
    //         navigate(`/mechanic/${mechanic.id}`);
    //     } else {
    //         alert('You have reached the maximum number of bookings per day');
    //     }
    // }

    const [mechanics, setMechanics] = useState([]);

    // get all mechanics
    useEffect(() => {
        fetch('https://raufuautomotive.herokuapp.com/mechanics')
            .then(res => res.json())
            .then(data => setMechanics(data))
    }, []);

    const handleBooking = (mechanic) => {
        // navigate('/clientInfo', { state: { mechanic } });
        console.log(mechanic);
    }

    return (
        <div className='bg-brand bg-brand-container'>
            <Navbar />
            <div className="container">
                <h1 className="text-center mt-5 mb-3 fs-4">Mechanics</h1>
                <div data-aos="fade-up" className="row mechanics-container justify-content-center align-items-center">
                    {
                        mechanics?.length ? 
                        mechanics.map(mechanic => {
                            return (
                                <div className="cart-deck mb-5 col-lg-3 col-md-5 col-sm-8 mx-1" key={mechanic.id}>

                                    <div className="cart">
                                        <Link to={`/mechanic/${mechanic._id}`} onClick={() => { window.scrollTo(0, 0); }} className='text-decoration-none text-black'>
                                            <img src={mechanic.image} className="cart-img-top img-fluid mx-auto d-block" alt={mechanic.name} />
                                        </Link>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="cart-body col-sm-6">
                                                <h5 className="cart-title">{mechanic.name}</h5>
                                            </div>

                                            <div className="d-flex col-sm-6">
                                                <div onClick={() => {
                                                    window.scrollTo(0, 0);
                                                    navigate(`/mechanic/${mechanic._id}`);
                                                }} className="col-sm-6 my-3">
                                                    <button className="btn btn-outline-dark">Details</button>
                                                </div>
                                                <div onClick={() => handleBooking(mechanic)
                                                    // addToBookings(mechanic.id)
                                                } className="col-sm-6 my-3 mx-3">
                                                    <button className="btn btn-outline-secondary">Book</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }) : <div style={{ position: 'absolute', height: '100px', width: '100px', top: '50%', left: '50%', marginLeft: '-50px', marginTop: '-50px' }}>
                        <img src={logo} id='breathing' width={100} height={100} className='img-fluid' alt="logo of Raufu Automotive" />
                        <p className='text-center'>Loading...</p>
                      </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Mechanics;