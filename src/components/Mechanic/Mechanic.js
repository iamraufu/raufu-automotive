import React from 'react';
import Navbar from '../Shared/Navbar/Navbar';
import { useParams, useNavigate } from 'react-router-dom';
import mechanics from '../../data/mechanicData.json';

const Mechanic = () => {
    // eslint-disable-next-line
    const navigate = useNavigate();

    
    const { id } = useParams();
    console.log(id)
    const mechanic = mechanics.find(mechanic => mechanic.id === id);

    return (
        <div className='bg-brand bg-brand-container'>
            <Navbar />
            <div className="container">
                <h1 className='mt-5 fs-4 text-center'>Product Details</h1>

                <div className="row mt-5 justify-content-center align-items-center">

                    <div className="col-lg-4">
                        <img src={mechanic.image} style={{ borderRadius: '1rem', boxShadow: '0 5px 15px #c4c4c44d' }} className='img-fluid mx-auto d-block mb-3 mechanic-image' width={250} alt={mechanic.image} />
                        <div className="d-flex justify-content-center align-items-center">
                            <button 
                            // onClick={() => addToCart(mechanic)} 
                            className='btn btn-dark mt-2 fw-bold'>Book Now</button>
                        </div>
                    </div>

                    <div className="col-lg-8 mb-3">
                        <div style={{ borderRadius: '1rem', boxShadow: '0 5px 15px #c4c4c44d' }} className="bg-white p-5 mx-auto">
                            <h3 className='fs-5 fw-bold'>{mechanic.name}</h3>
                            <hr />
                            <p style={{ textAlign: 'justify' }} className='fs-6'>{mechanic.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mechanic;