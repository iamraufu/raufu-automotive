import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import mechanics from '../../data/mechanicData.json';

const TopMechanic = () => {

    const navigate = useNavigate();

    let topMechanics = [];
    for (let i = 0; i < 3; i++) {
        const number = Math.floor(Math.random() * mechanics.length);
        if (!topMechanics.includes(mechanics[number])) {
            topMechanics.push(mechanics[number]);
        }
        else {
            i--;
        }
    }

    return (
        <div>
            <h1 style={{ fontSize: '22px', color: '#212529', fontWeight: '700' }} className='mt-5'>Top Mechanics of This Week</h1>

            <div className="row products-container justify-content-center align-items-center mt-5">
                {
                    topMechanics.map(mechanic => {
                        return (
                            <div className="cart-deck mb-5 col-lg-3 col-md-5 col-sm-8 mx-1" key={mechanic.id}>
                                <div className="cart">
                                    <Link to={`/mechanic/${mechanic.id}`} onClick={() => { window.scrollTo(0, 0); }} className='text-decoration-none text-black'>
                                        <img src={mechanic.image} className="cart-img-top img-fluid mx-auto d-block" alt={mechanic.name} />
                                    </Link>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="cart-body col-sm-6">
                                            <h2 className="cart-title">{mechanic.name}</h2>
                                        </div>

                                        <div className="d-flex col-sm-6">
                                            <div onClick={()=> {
                                                window.scrollTo(0, 0);
                                                navigate(`/mechanic/${mechanic.id}`);
                                                }} className="col-sm-6 my-3">
                                                <button className="btn btn-outline-dark">Details</button>
                                            </div>
                                            <div className="col-sm-6 my-3 mx-3">
                                                <button 
                                                // onClick={() => addToCart(product)} 
                                                className="btn btn-outline-secondary">Book</button>
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
    );
};

export default TopMechanic;