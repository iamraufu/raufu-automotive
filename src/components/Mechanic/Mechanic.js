import React, { useEffect, useState } from 'react';
import Navbar from '../Shared/Navbar/Navbar';
import { useParams, useNavigate } from 'react-router-dom';
// import mechanics from '../../data/mechanicData.json';
// import { addToBookings } from '../../utilities/bookingUtilities';
// import logo from '../../images/logo.svg';
import Skeleton from '../Skeleton/Skeleton';
import useAuth from '../../hooks/useAuth';

const Mechanic = () => {

    const { id } = useParams();
    const { user } = useAuth();
    // eslint-disable-next-line
    const navigate = useNavigate();

    const [mechanic, setMechanic] = useState({});
    const [allBookings, setAllBookings] = useState([]);
    const [bookings, setBookings] = useState([]);
    
    // convert date to readable format
    const date = `${formatTime(new Date().getFullYear())}-${formatTime(new Date().getMonth() + 1)}-${formatTime(new Date().getDate())}`;

    function formatTime(time) {
        return time < 10 ? (`0${time}`) : time;
    }

    useEffect(() => {
        fetch(`http://raufuautomotive.herokuapp.com/mechanic/${id}`)
            .then(res => res.json())
            .then(data => setMechanic(data))
    }, [id])

    useEffect(() => {
        fetch(`http://raufuautomotive.herokuapp.com/orders/${mechanic._id}`)
            .then(res => res.json())
            .then(data => setAllBookings(data.orders))
    }, [mechanic._id])

    useEffect(() => {
        const bookings = allBookings.filter(booking => booking.data.date === date);
        setBookings(bookings);
    }, [allBookings,date])

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
                        <div className="row mechanics-container">
                            <div className='cart-deck col-lg-3 col-md-5 col-sm-8 mb-5 mx-1'>
                                <Skeleton />
                            </div>
                        </div>
                }

                {
                    user.email === 'eftykharrahman@gmail.com' &&
                    <div className="py-5">
                        <h2 className='fs-5 text-primary'>{date} Total Bookings Today: {bookings.length}</h2>

                        {
                            bookings?.length > 0 &&
                            <div className="table-responsive">
                                <table style={{ border: '1px solid lightgrey' }} className="table table-success table-striped table-hover">
                                    <thead style={{ backgroundColor: '#E9EEF4' }}>
                                        <tr className='text-center'>
                                            <th>No.</th>
                                            <th>Id</th>
                                            <th>Client Name</th>
                                            <th>Date</th>
                                            <th>Mechanic Name</th>
                                            <th>Car Engine</th>
                                            <th>Car License</th>
                                            <th>Client Phone</th>
                                            <th>Client Address</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            bookings.map((booking, index) => (
                                                <tr key={index + 1} className='text-center'>
                                                    <td>{index + 1}</td>
                                                    <td>{booking?._id}</td>
                                                    <td>{booking?.data?.name}</td>
                                                    <td>{booking?.data?.date}</td>
                                                    <td>{booking?.mechanicName}</td>
                                                    <td>{booking?.data?.car_engine}</td>
                                                    <td>{booking?.data?.car_license}</td>
                                                    <td>{booking?.data?.phone}</td>
                                                    <td>{booking?.data?.address}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        }

                        <h2 className='fs-5 pt-5'>Total Bookings {allBookings.length}</h2>
                        {
                            allBookings?.length > 0 &&
                            <div className="table-responsive">
                                <table style={{ border: '1px solid lightgrey' }} className="table table-primary table-striped table-hover">
                                    <thead style={{ backgroundColor: '#E9EEF4' }}>
                                        <tr className='text-center'>
                                            <th>No.</th>
                                            <th>Id</th>
                                            <th>Client Name</th>
                                            <th>Date</th>
                                            <th>Mechanic Name</th>
                                            <th>Car Engine</th>
                                            <th>Car License</th>
                                            <th>Client Phone</th>
                                            <th>Client Address</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            allBookings.map((booking, index) => (
                                                <tr key={index + 1} className='text-center'>
                                                    <td>{index + 1}</td>
                                                    <td>{booking?._id}</td>
                                                    <td>{booking?.data?.name}</td>
                                                    <td>{booking?.data?.date}</td>
                                                    <td>{booking?.mechanicName}</td>
                                                    <td>{booking?.data?.car_engine}</td>
                                                    <td>{booking?.data?.car_license}</td>
                                                    <td>{booking?.data?.phone}</td>
                                                    <td>{booking?.data?.address}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        }
                    </div>
                }
            </div>
        </div>
    );
};

export default Mechanic;