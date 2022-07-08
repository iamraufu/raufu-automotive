import React from 'react';
import Hero from '../Hero/Hero';
import Navbar from '../Shared/Navbar/Navbar';
import TopMechanic from '../TopMechanic/TopMechanic';

const Home = () => {
    return (
        <section className='bg-brand bg-brand-container'>
            <Navbar />

            <div data-aos="fade-up" style={{maxHeight:'400px'}} className="container hero-container my-5">
                <Hero />
            </div>

            <div data-aos="fade-up" className="container">
                <TopMechanic />
            </div>
            
        </section>
    );
};

export default Home;