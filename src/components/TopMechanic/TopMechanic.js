import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import mechanics from '../../data/mechanicData.json';
// import { addToBookings } from '../../utilities/bookingUtilities';
// import logo from '../../images/logo.svg';
import Skeleton from '../Skeleton/Skeleton';

const TopMechanic = () => {

    const navigate = useNavigate();

    const [mechanics, setMechanics] = useState([]);
    const [topMechanics, setTopMechanics] = useState([]);

    useEffect(()=>{
        fetch('http://raufuautomotive.herokuapp.com/mechanics')
        .then(res => res.json())
        .then(data => setMechanics(data))
    },[])

    // randomly select 3 mechanics from the mechanics array
    useEffect(()=>setTopMechanics(mechanics.sort(() => Math.random() - 0.5).slice(0, 3)),[mechanics])

    const handleBooking = (mechanic) => {
        navigate('/clientInfo', { state: { mechanic } });
    }

    return (
        <div>
            <h1 style={{ fontSize: '22px', color: '#212529', fontWeight: '700' }} className='mt-5'>Top Mechanics of This Week</h1>

            <div className="row mechanics-container justify-content-center align-items-center">
                {
                    topMechanics?.length ? 
                    topMechanics.map(mechanic => {
                        return (
                            <div className="cart-deck mb-5 col-lg-3 col-md-5 col-sm-8 mx-1" key={mechanic._id}>
                                <div className="cart">
                                    <Link to={`/mechanic/${mechanic._id}`} onClick={() => { window.scrollTo(0, 0); }} className='text-decoration-none text-black'>
                                        <img src={mechanic.image} className="cart-img-top img-fluid mx-auto d-block" alt={mechanic.name} />
                                    </Link>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="cart-body col-sm-6">
                                            <h2 className="cart-title">{mechanic.name}</h2>
                                        </div>

                                        <div className="d-flex col-sm-6">
                                            <div onClick={() => {
                                                window.scrollTo(0, 0);
                                                navigate(`/mechanic/${mechanic._id}`);
                                            }} className="col-sm-6 my-3">
                                                <button className="btn btn-outline-dark">Details</button>
                                            </div>
                                            <div className="col-sm-6 my-3 mx-3">
                                                <button onClick={() => handleBooking(mechanic)} className="btn btn-outline-secondary">Book</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    }): 
                    // <div style={{ position: 'absolute', height: '100px', width: '100px', top: '50%', left: '50%', marginLeft: '-50px', marginTop: '-50px' }}>
                    //     <img src={logo} id='breathing' width={100} height={100} className='img-fluid' alt="logo of Raufu Automotive" />
                    //     <p className='text-center'>Loading...</p>
                    //   </div>
                    <div className="row mechanics-container justify-content-center align-items-center">
                            <div className='cart-deck col-lg-3 col-md-5 col-sm-8 mb-5 mx-1'>
                                <Skeleton />
                            </div>
                            
                            <div className='cart-deck col-lg-3 col-md-5 col-sm-8 mb-5 mx-1'>
                                <Skeleton />
                            </div>
                            
                            <div className='cart-deck col-lg-3 col-md-5 col-sm-8 mb-5 mx-1'>
                                <Skeleton />
                            </div>
                        </div>
                }
            </div>
        </div>
    );
};

export default TopMechanic;