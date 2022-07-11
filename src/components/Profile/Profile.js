import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import Navbar from '../Shared/Navbar/Navbar';
import update from '../../images/profile/update.svg';
import userPhoto from '../../images/profile/user.svg';
import logout from '../../images/profile/logout.svg';


const Profile = () => {

    const {user, logOut} = useAuth();

    const [userInfo, setUserInfo] = useState([]);

    useEffect(()=>{
        fetch(`https://raufuautomotive.herokuapp.com/user/${user.email}`)
        .then(res => res.json())
        .then(data => {
            setUserInfo(data.user)})
    },[user.email])

    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        fetch(`https://raufuautomotive.herokuapp.com/user/${userInfo._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                data.status === true ?
                    Swal.fire({
                        icon: 'success',
                        title: 'Successfully Updated!',
                        text: 'Your Information has been updated!',
                    }) :
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed!',
                        text: 'An Error has occurred. Please try again!',
                    })
            }).catch(err => Swal.fire({
                icon: 'error',
                title: 'Failed!',
                text: `${err}!`,
            }))
        // navigate('/dashboard/profile')
        document.getElementById('update_form').style.display = 'none';
        setTimeout(() => {
            window.location.reload()
        }, 1500)
    }

    const clickHandler = () => {
        // Swal.fire({
        //     title: 'Are you sure?',
        //     text: "You won't be able to revert this!",
        //     icon: 'warning',
        //     showCancelButton: true,
        //     confirmButtonColor: '#3085d6',
        //     cancelButtonColor: '#d33',
        //     confirmButtonText: 'Yes, delete it!'
        // }).then((result) => {
        //     if (result.value) {
        //         Swal.fire(
        //             'Deleted!',
        //             'Your file has been deleted.',
        //             'success'
        //         )
        //         logOut();
        //     }
        // })
        // if display block then hide it else show it
        document.getElementById('update_form').style.display === 'none' ? 
        document.getElementById('update_form').style.display = 'block' : 
        document.getElementById('update_form').style.display = 'none'
    }

    return (
        <div>
            <Navbar />
            <div className="container">
                <h1 className='mt-5 fs-4 text-center'>Profile</h1>
                
                <div className="pb-5">
                        <div style={{ backgroundColor: 'white', boxShadow: '0 5px 15px #c4c4c44d', maxWidth: '500px', height:'350px', borderRadius: '15px' }} className="mt-3 p-4 mx-auto">

                            <div className="d-flex justify-content-between">
                                <button id='update_btn' onClick={() => clickHandler()} className='btn'>
                                    <img src={update} width={20} alt="update" /> আপডেট
                                </button>
                                <button onClick={() => logOut()} className='btn'><img src={logout} width={18} alt="update" /> লগ আউট</button>
                            </div>

                            {
                                userInfo?.image ?
                                    <div style={{height:'100px'}} className='d-flex justify-content-center align-items-center'>
                                        <img width={100} style={{ borderRadius: '50%' }} className='mx-auto d-block' src={userInfo?.image} alt={user.name} />
                                    </div>
                                    :
                                    <img width={100} style={{ borderRadius: '50%' }} className='mx-auto d-block' src={userPhoto} alt='user ' />
                            }

                            {
                                userInfo?.email ?
                                    <div className="">
                                        {/* {
                                            hour < 18 && <h1 style={{ fontSize: '24px', lineHeight: '36px', color: '#343b6d', fontWeight: '700' }} className='text-center'>{hour >= 0 && hour < 12 ? "সুপ্রভাত" : "শুভ মধ্যাহ্ন"}, <span style={{ color: '#b94a8f' }}>{user.name}</span>!</h1>
                                        }
                                        {
                                            hour > 12 && <h1 style={{ fontSize: '24px', lineHeight: '36px', color: '#343b6d', fontWeight: '700' }} className='text-center'>{hour > 18 && hour < 24 ? "শুভ সন্ধ্যা" : "শুভ রাত্রি"}, <span style={{ color: '#b94a8f' }}>{user.name}</span>!</h1>
                                        } */}

                                        <h3 style={{ fontSize: '18px', lineHeight: '24px', color: '#343b6d', fontWeight: '700' }} className='text-center mt-3'>Name: <span style={{ color: '#b94a8f' }}>{userInfo?.name}</span></h3>
                                        <h3 style={{ fontSize: '18px', lineHeight: '24px', color: '#343b6d', fontWeight: '700' }} className='text-center'>Phone: <span style={{ color: '#b94a8f' }}>{userInfo?.phone || '01xxxxxxxxx'}</span></h3>
                                        <h3 style={{ fontSize: '18px', lineHeight: '24px', color: '#343b6d', fontWeight: '700' }} className='text-center'>Email: <span style={{ color: '#b94a8f' }}>{userInfo?.email}</span></h3>
                                        <h3 style={{ fontSize: '18px', lineHeight: '24px', color: '#343b6d', fontWeight: '700' }} className='text-center'>User from: <span style={{ color: '#b94a8f' }}>{(userInfo?.userCreatedAt)?.slice(0,10)}</span></h3>
                                    </div>
                                    :
                                    <div className="">
                                        <h3 style={{ fontSize: '18px', lineHeight: '24px', color: '#343b6d', fontWeight: '700' }} className='text-center mt-3'>Name: <span style={{ color: '#b94a8f' }}>Loading...</span></h3>
                                        <h3 style={{ fontSize: '18px', lineHeight: '24px', color: '#343b6d', fontWeight: '700' }} className='text-center'>Phone: <span style={{ color: '#b94a8f' }}>01xxxxxxxxx</span></h3>
                                        <h3 style={{ fontSize: '18px', lineHeight: '24px', color: '#343b6d', fontWeight: '700' }} className='text-center'>Email: <span style={{ color: '#b94a8f' }}>Loading...</span></h3>
                                        <h3 style={{ fontSize: '18px', lineHeight: '24px', color: '#343b6d', fontWeight: '700' }} className='text-center'>User from: <span style={{ color: '#b94a8f' }}>Loading...</span></h3>
                                    </div>
                            }                           
                        </div>

                        {
                            userInfo?.email && <div id='update_form' style={{ display: 'none', maxWidth: '500px' }} className="mx-auto">
                                <h3 style={{ fontSize: '18px', lineHeight: '24px', color: '#343b6d', fontWeight: '700' }} className='text-center mt-5'>Update Your Profile</h3>

                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form-group mt-2">
                                        <label htmlFor="name" className='p-1'>Your Name</label>
                                        <input type="text" defaultValue={userInfo?.name} className="form-control p-2" {...register("name")} />
                                    </div>

                                    <div className="form-group mt-2">
                                        <label htmlFor="image" className='p-1'>Paste Your ImageURL Anywhere from Internet</label>
                                        <input type="text" defaultValue={userInfo?.image} placeholder='https://' className="form-control p-2" {...register("image")} />
                                    </div>

                                    <div className="form-group mt-2">
                                        <label htmlFor="phone" className='p-1'>Phone</label>
                                        <input type="phone" defaultValue={userInfo?.phone} className="form-control p-2" {...register("phone")} />
                                    </div>

                                    <div className="form-group mt-2">
                                        <label htmlFor="email" className='p-1'>Email</label>
                                        <input type="email" defaultValue={userInfo?.email} className="form-control p-2" disabled {...register("email")} />
                                    </div>

                                    <div className="form-group mt-2">
                                        <label htmlFor="password" className='p-1'>Password</label>
                                        <input type="password" defaultValue={userInfo?.password} className="form-control p-2" {...register("password")} />
                                    </div>

                                    <div className="form-group mt-2">
                                        <label htmlFor="address" className='p-1'>Address</label>
                                        <input type="text" defaultValue={userInfo?.address} className="form-control p-2" {...register("address")} />
                                    </div>

                                    <div className="form-group mt-2">
                                        <label htmlFor="car_engine" className='p-1'>Car Engine</label>
                                        <input type="text" defaultValue={userInfo?.car_engine} className="form-control p-2" {...register("car_engine")} />
                                    </div>

                                    <div className="form-group mt-2">
                                        <label htmlFor="car_license" className='p-1'>Car License</label>
                                        <input type="text" defaultValue={userInfo?.car_license} className="form-control p-2" {...register("car_license")} />
                                    </div>

                                    <input className='btn btn-dark p-2 mt-2 mx-auto d-block' type="submit" value='Submit' />
                                </form>
                            </div>
                        }
                    </div>
            </div>
        </div>
    );
};

export default Profile;