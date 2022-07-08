import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Navbar from '../Shared/Navbar/Navbar';

const Profile = () => {

    const {logOut} = useAuth();

    const [user, setUser] = useState([]);

    useEffect(()=>{
        fetch('https://raufuautomotive.herokuapp.com/users')
        .then(res => res.json())
        .then(data => setUser(data))
    })

    return (
        <div>
            <Navbar />
            <div className="container">
                <h1 className='mt-5 fs-4 text-center'>Profile</h1>
                <button className='btn btn-sm btn-danger' onClick={logOut}>Log out</button>
                {
                    user?.email ? <p>{user.name}</p> : <p>locading...</p>
                }
            </div>
        </div>
    );
};

export default Profile;