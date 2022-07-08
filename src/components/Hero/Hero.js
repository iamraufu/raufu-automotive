import React from 'react';
// import heroImages from '../../data/heroImages.json';

const Hero = () => {


    return (
        <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">

            <div className="carousel-inner">
                {/* {
                    heroImages.map(hero =>
                        <div key={hero.id} className="carousel-item" data-bs-interval="2000">
                            <img src={hero.image} width={500} className="d-block img-fluid mx-auto" alt='hero' />
                        </div>
                    )
                } */}

                <div className="carousel-item active" data-bs-interval="1000">
                    <img src='https://i.ibb.co/D1fGcz5/1.jpg' width={500} className="d-block img-fluid mx-auto" alt="Hero 1" />
                </div>

                <div className="carousel-item" data-bs-interval="2000">
                    <img src='https://i.ibb.co/n6Fcxmx/2.jpg' width={500} className="d-block img-fluid mx-auto" alt="Hero 2" />
                </div>

                <div className="carousel-item" data-bs-interval="2000">
                    <img src='https://i.ibb.co/XLxRjcZ/3.jpg' width={500} className="d-block img-fluid mx-auto" alt="Hero 3" />
                </div>
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>

            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default Hero;