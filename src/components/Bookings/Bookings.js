import React from 'react';
import Navbar from '../Shared/Navbar/Navbar';
import { getStoredBookings, removeFromDb } from '../../utilities/bookingUtilities';
import { Link } from 'react-router-dom';
import mechanics from '../../data/mechanicData.json';

const Bookings = () => {

    let savedBookings = getStoredBookings();
    console.log(savedBookings);
    let bookings = [];
    console.log(mechanics)
    console.log(mechanics.find(pd => pd.id === '5'));
    for (let key in savedBookings) {
        bookings.push({ ...mechanics.find(pd => pd.id === key)})
    }

    console.log(bookings);

    return (
        <div className='bg-brand bg-brand-container'>
            <Navbar />
            <div className="container">
                <div className="row">
                    <h1 className="text-center mt-5 mb-3 fs-4">Bookings</h1>
                    {
                        bookings?.length > 0 ?
                            <div className="table-responsive pb-5">
                                <table style={{ border: '1px solid lightgrey' }} className="table table-striped">
                                    <thead style={{ backgroundColor: '#E9EEF4' }}>
                                        <tr className='text-center'>
                                            <th>Image</th>
                                            <th>Id</th>
                                            <th>Name</th>
                                            <th>Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            bookings.map((bookings, index) => (
                                                <tr key={index + 1} className='text-center'>
                                                    <td><img src={bookings?.image} className='img-fluid' width={40} alt={bookings?.name} /></td>
                                                    <td>{bookings?.id}</td>
                                                    <td>{bookings?.name}</td>
                                                    <td><button onClick={() => removeFromDb(bookings.id)} className='btn btn-danger'>Remove</button></td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                            :
                            <p style={{ maxWidth: '500px', backgroundColor: '#E9EEF4' }} className='p-2 text-primary'>You Currently have No Bookings<Link to='/mechanics' className='text-decoration-none'><span className='text-black'> Go Back</span></Link></p>
                    }
                </div>
            </div>
        </div>
    );
};

export default Bookings;