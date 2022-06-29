import React from 'react';
import mechanics from '../../data/mechanicData.json';
import Navbar from '../Shared/Navbar/Navbar';
import {useNavigate, Link} from 'react-router-dom';

const Mechanics = () => {
    const navigate = useNavigate();

    return (
        <div className='bg-brand bg-brand-container'>
            <Navbar />
            <div className="container">
                <h1 className="text-center mt-5 mb-3 fs-4">Mechanics</h1>
                <div className="row mechanics-container justify-content-center align-items-center">
                    {
                        mechanics.map(mechanic => {
                            return (
                                <div className="cart-deck mb-5 col-lg-3 col-md-5 col-sm-8 mx-1" key={mechanic.id}>

                                    <div className="cart">
                                        <Link to={`/mechanic/${mechanic.id}`} onClick={() => { window.scrollTo(0, 0); }} className='text-decoration-none text-black'>
                                            <img src={mechanic.image} className="cart-img-top img-fluid mx-auto d-block" alt={mechanic.name} />
                                        </Link>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="cart-body col-sm-6">
                                                <h5 className="cart-title">{mechanic.name}</h5>
                                            </div>

                                            <div className="d-flex col-sm-6">
                                                <div onClick= {()=> {
                                                    window.scrollTo(0, 0);
                                                    navigate(`/mechanic/${mechanic.id}`);
                                                }} className="col-sm-6 my-3">
                                                    <button className="btn btn-outline-dark">Details</button>
                                                </div>
                                                <div 
                                                // onClick={() => addToCart(mechanic) } 
                                                className="col-sm-6 my-3 mx-3">
                                                    <button className="btn btn-outline-secondary">Book</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Mechanics;