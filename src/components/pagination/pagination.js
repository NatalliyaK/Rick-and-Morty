import React from 'react';
import '../style/button.scss';
const Pagination = ({ nextPage, prevPage, goToPage, pages }) => {
    let pageButtons = []
    for (let i = 1; i <= pages; i++) {
        pageButtons.push(<button key={i} onClick={() => goToPage(i)} className='--border'>{i}</button>)
    }
    return (
        <div className='wrapper button-contaener'>
            {prevPage && (<button onClick={prevPage} className='button-item'>&laquo; Prev</button>)}
            {pageButtons}
            {nextPage && (<button onClick={nextPage} className='button-item'>Next &raquo;</button>)}
        </div>
    )
}
export default Pagination;