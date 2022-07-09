import React, { useEffect, useState } from 'react';
import Navbar from '../Shared/Navbar/Navbar';
// import { getStoredBookings, removeFromDb } from '../../utilities/bookingUtilities';
// import { Link } from 'react-router-dom';
// import mechanics from '../../data/mechanicData.json';

const Bookings = () => {

    // let savedBookings = getStoredBookings();
    // console.log(savedBookings);
    // let bookings = [];
    // console.log(mechanics)
    // console.log(mechanics.find(pd => pd.id === '5'));
    // for (let key in savedBookings) {
    //     bookings.push({ ...mechanics.find(pd => pd.id === key)})
    // }

    const [bookings, setBookings] = useState([]);
    useEffect(()=>{
        fetch('https://raufuautomotive.herokuapp.com/orders')
            .then(res => res.json())
            .then(data => {
                setBookings(data.orders);
            }
            )
    },[])

    return (
        <div className='bg-brand bg-brand-container'>
            <Navbar />
            <div className="container">
                <div className="row">
                    <h1 className="text-center mt-5 mb-3 fs-4">Appointments Lists</h1>
                    {
                        bookings?.length > 0 ?
                            <div className="table-responsive pb-5">
                                <table style={{ border: '1px solid lightgrey' }} className="table table-primary table-striped table-hover">
                                    <thead style={{ backgroundColor: '#E9EEF4' }}>
                                        <tr className='text-center'>
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
                                                    <td>{booking?._id}</td>
                                                    <td>{booking?.data?.name}</td>
                                                    <td>{booking?.data?.date}</td>
                                                    <td>{booking?.mechanicName}</td>
                                                    <td>{booking?.data?.car_engine}</td>
                                                    <td>{booking?.data?.car_license}</td>
                                                    <td>{booking?.data?.phone}</td>
                                                    <td>{booking?.data?.address}</td>
                                                    {/* <td><button onClick={() => removeFromDb(bookings.id)} className='btn btn-danger'>Remove</button></td> */}
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                            :
                            <p style={{ maxWidth: '500px', backgroundColor: '#E9EEF4' }} className='p-2 text-primary'>You Currently have No Bookings
                            {/* <Link to='/mechanics' className='text-decoration-none'><span className='text-black'> Go Back</span></Link> */}
                            </p>
                    }
                </div>
            </div>
        </div>
    );
};

export default Bookings;