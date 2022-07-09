import React, { useEffect, useState } from 'react';
import Navbar from '../Shared/Navbar/Navbar';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const navigate = useNavigate();

    const [mechanics, setMechanics] = useState([]);

    // get mechanics from database
    useEffect(() => {
        fetch('https://raufuautomotive.herokuapp.com/mechanics')
            .then(res => res.json())
            .then(data => setMechanics(data))
    })

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => addMechanic(data);

    // add mechanic to database
    const addMechanic = (data) => {
        const mechanicDetails = data;
        fetch('https://raufuautomotive.herokuapp.com/mechanic', {
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
        fetch(`https://raufuautomotive.herokuapp.com/mechanic/${id}`, {
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

    // get users from database
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch('https://raufuautomotive.herokuapp.com/users')
            .then(res => res.json())
            .then(data => setUsers(data.users))
    }
        , [])

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
                        <h2 className='mt-5 fs-5'>Mechanics List</h2>
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
                        <h2 className='mt-5 fs-5'>Users List</h2>
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
                                                    {/* <td>
                                                        <div className="d-flex">
                                                            <button onClick={() => navigate(`/mechanic/${user._id}`)} className='btn btn-sm btn-secondary mx-2'>View</button>
                                                            <button onClick={() => removeMechanic(user._id)} className='btn btn-sm btn-danger'>Remove</button>
                                                        </div>
                                                    </td> */}
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div> : <p className='text-danger fw-bold text-center fs-4'>No Users Found!</p>
                        }
                    </div>

                    <div className="col-md-12">
                        <h2 className='mt-5 fs-5'>Appointments List</h2>
                        {
                            users?.length ? <div className="table-responsive my-3">
                                <table className='table table-primary table-striped text-center table-hover'>
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Appointment Date</th>
                                            <th>Client's Name</th>
                                            <th>Mechanic Name</th>
                                            <th>Email</th>
                                            <th>Address</th>
                                            <th>Phone</th>
                                            <th>Car License</th>
                                            <th>Car Engine</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user, index) => {
                                            return (
                                                <tr key={user._id}>
                                                    <td>{index + 1}</td>
                                                    <td>{user.appointment_date}</td>
                                                    <td>{user.name}</td>
                                                    <td>{user.mechanic_name}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.address}</td>
                                                    <td>{user.phone}</td>
                                                    <td>{user.car_license}</td>
                                                    <td>{user.car_engine}</td>
                                                    {/* <td>
                                                        <div className="d-flex">
                                                            <button onClick={() => navigate(`/mechanic/${user._id}`)} className='btn btn-sm btn-secondary mx-2'>View</button>
                                                            <button onClick={() => removeMechanic(user._id)} className='btn btn-sm btn-danger'>Remove</button>
                                                        </div>
                                                    </td> */}
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div> : <p className='text-danger fw-bold text-center fs-4'>No Appointments Found!</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;