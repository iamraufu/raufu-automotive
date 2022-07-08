import React from 'react';
import { useForm } from "react-hook-form";
// import Swal from 'sweetalert2';
import Navbar from '../Shared/Navbar/Navbar';
import { useNavigate, useLocation } from 'react-router-dom';
import { addToBookings } from '../../utilities/bookingUtilities';

const ClientInfo = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        localStorage.setItem('clientInfo', JSON.stringify(data));
        addToBookings(location.state.mechanic);
        // Swal.fire({
        //     icon: 'success',
        //     title: 'Booking Confirmed!',
        //     text: `Dear ${data.name}, Your Booking for ${data.appointment_date} has been confirmed!`,
        // });
        navigate('/bookings');
    }

    // const clientInfo = localStorage.getItem('clientInfo') ? JSON.parse(localStorage.getItem('clientInfo')) : {};

    return (
        <div className='bg-brand bg-brand-container'>
            <Navbar />
            <div className="container mt-5">
                <h1 className='fs-4 text-center'>Client Details</h1>

                <div className="col-md-6 col-sm-8 mx-auto d-block">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group mt-2">
                            <label htmlFor="name" className='p-1'>Your Name</label>
                            <input type="text" className="form-control p-2" 
                            // value={clientInfo.name}
                            {...register("name", { required: true })} />
                            {errors.name && <span className='text-danger'>This Field is required</span>}
                        </div>

                        <div className="form-group mt-2">
                            <label htmlFor="address" className='p-1'>Your Present Address</label>
                            <input type="text" className="form-control p-2" 
                            // value={clientInfo.address}
                            {...register("address", { required: true })} />
                            {errors.address && <span className='text-danger'>This Field is required</span>}
                        </div>

                        <div className="form-group mt-2">
                            <label htmlFor="phone" className='p-1'>Your Phone Number</label>
                            <input type="number" className="form-control p-2" 
                            // value={clientInfo.phone}
                            {...register("phone", { required: true })} />
                            {errors.phone && <span className='text-danger'>This Field is required</span>}
                        </div>

                        <div className="form-group mt-2">
                            <label htmlFor="car_license_number" className='p-1'>Car License Number</label>
                            <input type="text" className="form-control p-2" 
                            // value={clientInfo.car_license_number}
                            {...register("car_license_number", { required: true })} />
                            {errors.car_license_number && <span className='text-danger'>This Field is required</span>}
                        </div>
                        
                        <div className="form-group mt-2">
                            <label htmlFor="car_engine_number" className='p-1'>Car Engine Number</label>
                            <input type="text" className="form-control p-2" 
                            // value={clientInfo.car_engine_number}
                            {...register("car_engine_number", { required: true })} />
                            {errors.car_engine_number && <span className='text-danger'>This Field is required</span>}
                        </div>

                        <div className="form-group mt-2">
                            <label htmlFor="appointment_date" className='p-1'>Appointment Date</label>
                            <input type="date" className="form-control p-2" 
                            // value={clientInfo.appointment_date}
                            {...register("appointment_date", { required: true })} />
                            {errors.appointment_date && <span className='text-danger'>This Field is required</span>}
                        </div>

                        <p><small className="form-text text-muted">We'll never share your information with anyone else.</small></p>
                        <input className='btn btn-dark p-2 mt-2' type="submit" value='Book Now' />
                    </form>

                </div>
            </div>
        </div>
    );
};

export default ClientInfo;