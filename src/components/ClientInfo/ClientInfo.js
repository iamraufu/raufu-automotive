import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
// import Swal from 'sweetalert2';
import Navbar from '../Shared/Navbar/Navbar';
import {
    useNavigate
    , useLocation
} from 'react-router-dom';
// import { addToBookings } from '../../utilities/bookingUtilities';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const ClientInfo = () => {

    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    
    !location.state && navigate('/mechanics')

    const mechanicName = location.state?.mechanic.name;
    const mechanicId = location.state?.mechanic._id;

    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        fetch(`https://raufuautomotive.herokuapp.com/user/${user.email}`)
            .then(res => res.json())
            .then(data => {
                setUserInfo(data.user);
            })
    }, [user.email])

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => { 
        // const { name, phone, address, car_engine, car_license } = data;
        localStorage.setItem('phone',data.phone)
        userInfoUpdate(data);
        bookAppointment(data); 
    }

    // update userIno 
    const userInfoUpdate =(data) =>{
        fetch(`https://raufuautomotive.herokuapp.com/user/${userInfo._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
    }

    // booking to database
    const bookAppointment = (data) => {
        const bookingDetails = {
            data,
            mechanicId: mechanicId,
            mechanicName: mechanicName
        };
        fetch('https://raufuautomotive.herokuapp.com/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookingDetails)
        })
            .then(res => res.json())
            .then(data => {
                Swal.fire({
                    icon: 'success',
                    title: 'Booking Confirmed!',
                    text: `Your Booking for ${mechanicName} has been confirmed!`,
                })
            })
        navigate('/bookings')
    }

    return (
        <div className='bg-brand bg-brand-container'>
            <Navbar />
            <div className="container mt-5">
                <h1 className='fs-4 text-center'>Client Details</h1>

                {
                    userInfo?.email ? <div className="col-md-6 col-sm-8 mx-auto d-block pb-5">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group mt-2">
                                <label htmlFor="name" className='p-1'>Your Name</label>
                                <input type="text" defaultValue={userInfo?.name} className="form-control p-2"
                                    {...register("name", { required: true })} />
                                {errors.name && <span className='text-danger'>This Field is required</span>}
                            </div>

                            <div className="form-group mt-2">
                                <label htmlFor="address" className='p-1'>Your Present Address</label>
                                <input type="text" defaultValue={userInfo?.address} className="form-control p-2"
                                    {...register("address", { required: true })} />
                                {errors.address && <span className='text-danger'>This Field is required</span>}
                            </div>

                            <div className="form-group mt-2">
                                <label htmlFor="phone" className='p-1'>Your Phone Number</label>
                                <input type="number" defaultValue={userInfo?.phone} className="form-control p-2"
                                    {...register("phone", { required: true })} />
                                {errors.phone && <span className='text-danger'>This Field is required</span>}
                            </div>

                            <div className="form-group mt-2">
                                <label htmlFor="car_license" className='p-1'>Car License Number</label>
                                <input type="text" defaultValue={userInfo?.car_license} className="form-control p-2"
                                    {...register("car_license", { required: true })} />
                                {errors.car_license && <span className='text-danger'>This Field is required</span>}
                            </div>

                            <div className="form-group mt-2">
                                <label htmlFor="car_engine" className='p-1'>Car Engine Number</label>
                                <input type="text" defaultValue={userInfo?.car_engine} className="form-control p-2"
                                    {...register("car_engine", { required: true })} />
                                {errors.car_engine && <span className='text-danger'>This Field is required</span>}
                            </div>

                            <div className="form-group mt-2">
                                <label htmlFor="date" className='p-1'>Appointment Date</label>
                                <input type="date" 
                                // defaultValue={userInfo?.date} 
                                className="form-control p-2"
                                    {...register("date", { required: true })} />
                                {errors.date && <span className='text-danger'>This Field is required</span>}
                            </div>

                            <p><small className="form-text text-muted">We'll never share your information with anyone else.</small></p>
                            <input className='btn btn-dark p-2 mt-2' type="submit" value='Book Now' />
                        </form>

                    </div> :
                        <div>
                            <div className='skeleton col-md-6 col-sm-8 mx-auto d-block pb-5'>
                                <div className="mt-4"></div>
                            </div>
                            <div className='skeleton col-md-6 col-sm-8 mx-auto d-block pb-5'>
                                <div className="mt-4"></div>
                            </div>
                            <div className='skeleton col-md-6 col-sm-8 mx-auto d-block pb-5'>
                                <div className="mt-4"></div>
                            </div>
                            <div className='skeleton col-md-6 col-sm-8 mx-auto d-block pb-5'>
                                <div className="mt-4"></div>
                            </div>
                            <div className='skeleton col-md-6 col-sm-8 mx-auto d-block pb-5'>
                                <div className="mt-4"></div>
                            </div>
                            <div className='skeleton col-md-6 col-sm-8 mx-auto d-block pb-5'>
                                <div className="mt-4"></div>
                            </div>
                        </div>
                }
            </div>
        </div>
    );
};

export default ClientInfo;