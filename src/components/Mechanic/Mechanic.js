import React, { useEffect, useState } from 'react';
import Navbar from '../Shared/Navbar/Navbar';
import { useParams, useNavigate } from 'react-router-dom';
// import mechanics from '../../data/mechanicData.json';
// import { addToBookings } from '../../utilities/bookingUtilities';
// import logo from '../../images/logo.svg';
import Skeleton from '../Skeleton/Skeleton';

const Mechanic = () => {

    const { id } = useParams();
    // eslint-disable-next-line
    const navigate = useNavigate();

    const [mechanic, setMechanic] = useState({});

    useEffect(() => {
        fetch(`https://raufuautomotive.herokuapp.com/mechanic/${id}`)
            .then(res => res.json())
            .then(data => setMechanic(data))
    },[id])

    const handleBooking = (mechanic) => {
        navigate('/clientInfo', { state: { mechanic } });
    }

    return (
        <div className='bg-brand bg-brand-container'>
            <Navbar />
            <div className="container">
                <h1 className='mt-5 fs-4 text-center'>Mechanic Information</h1>

                {
                    mechanic?._id ? <div className="row mt-5 justify-content-center align-items-center">

                        <div className="col-lg-4">
                            <img src={mechanic.image} style={{ borderRadius: '1rem', boxShadow: '0 5px 15px #c4c4c44d' }} className='img-fluid mx-auto d-block mb-3 mechanic-image' width={250} alt={mechanic.image} />
                            <div className="d-flex justify-content-center align-items-center">
                                <button onClick={() => handleBooking(mechanic)} className='btn btn-dark mt-2 fw-bold'>Book Now</button>
                            </div>
                        </div>

                        <div className="col-lg-8 mb-3">
                            <div style={{ borderRadius: '1rem', boxShadow: '0 5px 15px #c4c4c44d' }} className="bg-white p-5 mx-auto mt-3">
                                <h3 className='fs-5 fw-bold'>{mechanic.name}</h3>
                                <hr />
                                <p style={{ textAlign: 'justify' }} className='fs-6'>{mechanic.description}</p>
                            </div>
                        </div>
                    </div> :
                        // <div style={{ position: 'absolute', height: '100px', width: '100px', top: '50%', left: '50%', marginLeft: '-50px', marginTop: '-50px' }}>
                        //         <img src={logo} id='breathing' width={100} height={100} className='img-fluid' alt="logo of Raufu Automotive" />
                        //         <p className='text-center'>Loading...</p>
                        // </div>
                        <div className="row mechanics-container">
                            <div className='cart-deck col-lg-3 col-md-5 col-sm-8 mb-5 mx-1'>
                                <Skeleton />
                            </div>
                        </div>
                }
            </div>
        </div>
    );
};

export default Mechanic;