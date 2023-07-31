import React from 'react';
import './scrollToTop.scss';

function ScrollToTop() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return (
        <button  className='top' onClick={scrollToTop}>
            Наверх
        </button>
    );
}

export default ScrollToTop;