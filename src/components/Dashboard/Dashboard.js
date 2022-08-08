import React, { useEffect, 
    // useReducer, 
    useState } from 'react';
import Navbar from '../Shared/Navbar/Navbar';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const navigate = useNavigate();
    // const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);
    const [user, setUser] = useState({});
    const [mechanics, setMechanics] = useState([]);
    // get mechanics from database
    useEffect(() => {
        fetch('http://raufuautomotive.herokuapp.com/mechanics')
            .then(res => res.json())
            .then(data => {
                setMechanics(data)
                // forceUpdate()
            })
    // }, [reducerValue])
    }, [])
    

    // get users from database
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch('http://raufuautomotive.herokuapp.com/users')
            .then(res => res.json())
            .then(data => {
                setUsers(data.users)
                // forceUpdate()
            })
    // }, [reducerValue])
    }, [])

    // get bookings from database
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        fetch('http://raufuautomotive.herokuapp.com/orders')
            .then(res => res.json())
            .then(data => {
                setBookings(data.orders);
                // forceUpdate()
            }
            )
    // }, [reducerValue])
    }, [])

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { register: register2, handleSubmit: handleSubmit2 } = useForm();

    const onSubmit = data => addMechanic(data);

    // add mechanic to database
    const addMechanic = (data) => {
        const mechanicDetails = data;
        fetch('http://raufuautomotive.herokuapp.com/mechanic', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mechanicDetails)
        })
            .then(res => res.json())
            .then(data => {
                (data.status === true) && Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: data.message,
                })
                document.getElementById('name').value = '';
                document.getElementById('description').value = '';
                document.getElementById('image').value = '';
            })
    }

    // remove mechanic from database
    const removeMechanic = (id) => {
        fetch(`http://raufuautomotive.herokuapp.com/mechanic/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                (data.status === true) && Swal.fire({
                    icon: 'info',
                    title: 'Removed!',
                    text: data.message,
                })
            })
    }

    // remove Appointment from database
    const removeAppointment = (id) => {
        fetch(`http://raufuautomotive.herokuapp.com/order/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                (data.status === true) && Swal.fire({
                    icon: 'info',
                    title: 'Removed!',
                    text: data.message,
                })
            })
    }

    // remove user from database
    const removeUser = (id) => {
        fetch(`http://raufuautomotive.herokuapp.com/user/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                (data.status === true) && Swal.fire({
                    icon: 'info',
                    title: 'Removed!',
                    text: data.message,
                })
            })
    }
    const onSubmit2 = data => {
        const bookingData = {
            data:{
                name: data.name,
                address: data.address,
                car_engine: data.car_engine,
                car_license: data.car_license,
                date: data.date,
                phone: data.phone,
            },
            mechanicName: data.mechanicName,
            mechanicId: data.mechanicId
        }
        updateOrder(bookingData);
    }

    // update order to database
    const updateOrder = (bookingData) => {
        const orderDetails = bookingData;
        fetch(`http://raufuautomotive.herokuapp.com/order/${user._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
            .then(res => res.json())
            .then(data => {
                (data.status === true) ? Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: data.message,
                }) :
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: data.message,
                    })
                document.getElementById('edit_appointments').style.display = 'none';
            })
    }

    return (
        <div>
            <Navbar />
            <div className="container">
                <h1 className='mt-5 text-center fs-4'>Admin Dashboard</h1>

                <div className="row">
                    <div className="col-md-6">
                        <h2 className='mt-5 fs-5'>Add new Mechanic</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div style={{ width: '350px' }} className="">
                                <div className="form-group mt-2">
                                    <label htmlFor='name' className='p-1'>Name</label>
                                    <input id='name' type='text' className="form-control p-2" {...register("name", { required: true })} />
                                    {errors.name && <span className='text-danger'>This field is required</span>}
                                </div>

                                <div className="form-group mt-2">
                                    <label htmlFor='description' className='p-1'>Description</label>
                                    <textarea id='description' type='text' className="form-control p-2"{...register("description", { required: true })} />
                                    {errors.description && <span className='text-danger'>This field is required</span>}
                                </div>

                                <div className="form-group mt-2">
                                    <label htmlFor='image' className='p-1'>Image URL</label>
                                    <input id='image' type='text' className="form-control p-2"{...register("image", { required: true })} />
                                    {errors.image && <span className='text-danger'>This field is required</span>}
                                </div>

                                <input type="submit" className="btn btn-dark p-2 mt-2" value="Add" />
                            </div>
                        </form>
                    </div>

                    <div className="col-md-6">
                        <h2 className='mt-5 fs-5'>Mechanics List <span className='fw-bold text-primary fs-4'>{mechanics.length}</span></h2>
                        {
                            mechanics?.length ? <div className="table-responsive my-3">
                                <table className='table table-striped text-center table-hover'>
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Id</th>
                                            <th>Name</th>
                                            <th>Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mechanics.map((mechanic, index) => {
                                            return (
                                                <tr key={mechanic._id}>
                                                    <td>{index + 1}</td>
                                                    <td>{mechanic._id}</td>
                                                    <td>{mechanic.name}</td>
                                                    <td>
                                                        <div className="d-flex">
                                                            <button onClick={() => navigate(`/mechanic/${mechanic._id}`)} className='btn btn-sm btn-secondary mx-2'>View</button>
                                                            <button onClick={() => removeMechanic(mechanic._id)} className='btn btn-sm btn-danger'>Remove</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div> : <p className='text-danger fw-bold text-center fs-4'>No Mechanic Found!</p>
                        }
                    </div>
                </div>

                <div className='row'>
                    <div className="col-md-12">
                        <h2 className='mt-5 fs-5'>Appointments List <span className='fw-bold text-primary fs-4'>{bookings.length}</span></h2>
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
                                                <th>Details</th>
                                                <th>Remove</th>
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
                                                        <td><button onClick={() => {
                                                            document.getElementById('edit_appointments').style.display = 'block';
                                                            setUser(booking);
                                                        }} className='btn btn-sm btn-outline-dark'>Edit</button></td>
                                                        <td><button onClick={() => removeAppointment(booking._id)} className='btn btn-danger'>Delete</button></td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                :
                                <p style={{ maxWidth: '500px', backgroundColor: '#E9EEF4' }} className='p-2 text-primary'>You Currently have No Bookings
                                    <Link to='/mechanics' className='text-decoration-none'><span className='text-black'> Go Back</span></Link>
                                </p>
                        }

                        <div id='edit_appointments' style={{ display: 'none' }} className="">

                            <h3 className='fs-5 text-center'>Edit Appointments</h3>

                            {
                                user && 
                                <form onSubmit={handleSubmit2(onSubmit2)}>
                                <div className="form-group mt-2">
                                    <label htmlFor="name" className='p-1'>Client's Name</label>
                                    <input type="text"
                                        defaultValue={user?.data?.name} 
                                        className="form-control p-2"
                                        {...register2("name", { required: true })} />
                                    {errors.name && <span className='text-danger'>This Field is required</span>}
                                </div>

                                <div className="form-group mt-2">
                                    <label htmlFor="address" className='p-1'>Client's Present Address</label>
                                    <input type="text"
                                        defaultValue={user?.data?.address} 
                                        className="form-control p-2"
                                        {...register2("address", { required: true })} />
                                    {errors.address && <span className='text-danger'>This Field is required</span>}
                                </div>

                                <div className="form-group mt-2">
                                    <label htmlFor="phone" className='p-1'>Client's Phone Number</label>
                                    <input type="number"
                                        defaultValue={user?.data?.phone} 
                                        className="form-control p-2"
                                        {...register2("phone", { required: true })} />
                                    {errors.phone && <span className='text-danger'>This Field is required</span>}
                                </div>

                                <div className="form-group mt-2">
                                    <label htmlFor="car_license" className='p-1'>Car License Number</label>
                                    <input type="text"
                                        defaultValue={user?.data?.car_license} 
                                        className="form-control p-2"
                                        {...register2("car_license", { required: true })} />
                                    {errors.car_license && <span className='text-danger'>This Field is required</span>}
                                </div>

                                <div className="form-group mt-2">
                                    <label htmlFor="car_engine" className='p-1'>Car Engine Number</label>
                                    <input type="text"
                                        defaultValue={user?.data?.car_engine} 
                                        className="form-control p-2"
                                        {...register2("car_engine", { required: true })} />
                                    {errors.car_engine && <span className='text-danger'>This Field is required</span>}
                                </div>

                                <div className="form-group mt-2">
                                    <label htmlFor="date" className='p-1'>Appointment Date</label>
                                    <input type="date"
                                        defaultValue={user?.data?.date} 
                                        className="form-control p-2"
                                        {...register2("date", { required: true })} />
                                    {errors.date && <span className='text-danger'>This Field is required</span>}
                                </div>

                                <div className="form-group mt-2">
                                    <label htmlFor="mechanicId" className='p-1'>Mechanic Id</label>
                                    <input type="text"
                                        defaultValue={user?.mechanicId} 
                                        className="form-control p-2"
                                        {...register2("mechanicId", { required: true })} />
                                    {errors.mechanicId && <span className='text-danger'>This Field is required</span>}
                                </div>

                                <div className="form-group mt-2">
                                    <label htmlFor="mechanicName" className='p-1'>Mechanic Name</label>
                                    <input type="text"
                                        defaultValue={user?.mechanicName} 
                                        className="form-control p-2"
                                        {...register2("mechanicName", { required: true })} />
                                    {errors.mechanicName && <span className='text-danger'>This Field is required</span>}
                                </div>

                                <p><small className="form-text text-danger">Double Check information before updating!</small></p>
                                <input className='btn btn-dark p-2 mt-2' type="submit" value='Update' />
                            </form>
                            }
                        </div>

                    </div>

                    <div className="col-md-12 mt-5">
                        <h2 className='fs-5'>Users List <span className='fw-bold text-primary fs-4'>{users.length}</span></h2>
                        {
                            users?.length ? <div className="table-responsive my-3">
                                <table className='table table-success table-striped text-center table-hover'>
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Id</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Address</th>
                                            <th>Phone</th>
                                            <th>Car License</th>
                                            <th>Car Engine</th>
                                            <th>Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user, index) => {
                                            return (
                                                <tr key={user._id}>
                                                    <td>{index + 1}</td>
                                                    <td>{user._id}</td>
                                                    <td>{user.name}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.address}</td>
                                                    <td>{user.phone}</td>
                                                    <td>{user.car_license}</td>
                                                    <td>{user.car_engine}</td>
                                                    <td>
                                                        <div className="d-flex">
                                                            {/* <button onClick={() => navigate(`/mechanic/${user._id}`)} className='btn btn-sm btn-secondary mx-2'>View</button> */}
                                                            <button onClick={() => removeUser(user._id)} className='btn btn-sm btn-danger'>Delete</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div> : <p className='text-danger fw-bold text-center fs-4'>No Users Found!</p>
                        }
                    </div>


                </div>
            </div>
        </div>
    );
};

export default Dashboard;