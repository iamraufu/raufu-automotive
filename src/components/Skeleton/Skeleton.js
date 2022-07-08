import React from 'react';
import './Skeleton.css';

const Skeleton = () => {
    return (
        <div className=''>
            {/* <a class="card" id="card-link" href='/' target="_blank">
                <div class="card__header">
                    <div>
                        <img class="card__header header__img skeleton" id="logo-img" alt="" />
                    </div>
                    <h3 class="card__header header__title" id="card-title">
                        <div class="skeleton skeleton-text"></div>
                        <div class="skeleton skeleton-text"></div>
                    </h3>
                </div>

                <div class="card__body">
                    <div class="card__body body__text" id="card-details">
                        <div class="skeleton skeleton-text skeleton-text__body"></div>
                    </div>

                    <div class="card__body body__img">
                        <img class="skeleton" alt="" id="cover-img" />
                    </div>
                </div>

                <div class="card__footer" id="card-footer">
                    <div class="skeleton skeleton-text skeleton-footer"></div>
                </div>
            </a> */}
            {/* <div className="cart-deck mb-5 col-lg-3 col-md-5 col-sm-8"> */}
                <div className="cart pt-4 px-3">
                    <div className='cart-img-top_skeleton skeleton'></div>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="skeleton skeleton-text mt-4"></div>
                    </div>
                </div>
            {/* </div> */}
        </div>
    );
};

export default Skeleton;