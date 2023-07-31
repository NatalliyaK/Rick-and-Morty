import React, { useState, useEffect } from 'react';
import { getResource } from '../servises/ramServises';
import { getCharacters } from '../servises/ramServises';
import Spinner from '../spinner';
import CardItem from '../card-item';
import ScrollToTop from '../scrollToTop';
import InfiniteScroll from 'react-infinite-scroll-component';
import './cards.scss';
import '../style/button.scss';
import ShowModal from '../show-modal';
import Pagination from '../pagination';


function Cards() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(2);
    const [hasMoreData, setHasMoreData] = useState(true);
    const [pagesCount, setPagesCount] = useState(0);
    const [selectedNumber, setSelectedNumber] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    const [currentPageUrl, setCurrentPageUrl] = useState("https://rickandmortyapi.com/api/character");
    const [nextPageUrl, setNextPageUrl] = useState();
    const [prevPageUrl, setPrevPageUrl] = useState();
    const [pages, setPages] = useState();
    const [mode, setMode] = useState('infinite-scroll');

    const handleModeChange = (newMode) => {
        setMode(newMode);
    }

    useEffect(() => {
        getResource('/character')
            .then((characters) => {
            setData(characters.results);
            setIsLoading(false);
            setPagesCount(characters.info.pages);
        })
    }, []);

    useEffect(() => {
        const url = currentPageUrl
        setIsLoading(true)
        const fetchData = async () => {
            const res = await fetch(url);
            const data = await res.json();
            setData(data.results)
            setIsLoading(false);
            setNextPageUrl(data.info.next);
            setPrevPageUrl(data.info.prev);
            setPages(data.info.pages)
        }
        fetchData();
    },[currentPageUrl])

    const handleOnClick = (e) => {
        const clickedCard = e.currentTarget;
        setSelectedNumber(parseInt(clickedCard.dataset.cardNumber) - 1)

        if (isVisible === false) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }

    const fetchNextPage = () => {
        setPageNumber(pageNumber + 1);
        setIsLoading(true);

        if (pagesCount > pageNumber) {
            const fetchMoreData = async () => {

                try {
                    getCharacters(pageNumber)
                        .then((characters) => {
                            const allData = [...data, ...characters.results]
                            setData(allData);
                            setIsLoading(false);
                        })
                } catch (error) {
                    console.log("error", error);
                }
            };

            fetchMoreData();
        } else {
            setHasMoreData(false);
        }

        setIsLoading(false);
    }

    const nextPage = () => {
        setCurrentPageUrl(nextPageUrl)
    }

    const prevPage = () => {
        setCurrentPageUrl(prevPageUrl)
    }

    const goToPage = (num) => {
        setCurrentPageUrl(`https://rickandmortyapi.com/api/character?page=${num}`)
    }

    if (isLoading) {
        return <Spinner />
    } else {
        return (
            <>
                <div className='button'>
                    <button onClick={() => handleModeChange('infinite-scroll')} className='button-item'>Infinite Scroll</button>
                    <button onClick={() => handleModeChange('pagination')} className='button-item'>Pagination</button>
                </div>
                { mode === 'infinite-scroll'
                    ? (<InfiniteScroll
                        dataLength={data ? data.length : 0}
                        next={() => fetchNextPage()}
                        hasMore={hasMoreData}
                        loader={<Spinner />}
                    >
                        <ul className='cards-wrapper'>
                            { data
                                .filter(char => char.id)
                                .map(char => (
                                    <li className='cards'
                                        data-card-number={char.id}
                                        key={ char.id }
                                        onClick={(e) => handleOnClick(e)}
                                    >
                                        <CardItem data={char} />
                                    </li>
                                )
                            ) }
                        </ul>
                        <ScrollToTop />
                        { isVisible && <ShowModal data={ data[selectedNumber] } isDisplay={ setIsVisible }/> }
                    </InfiniteScroll> )
                    : (
                    <>
                        <Pagination
                            nextPage={nextPageUrl ? nextPage : null}
                            prevPage={prevPageUrl ? prevPage : null}
                            goToPage={goToPage}
                            pages={pages}
                        />
                        <ul className='cards-wrapper'>
                            { data.map((char, index) => (
                                    <li className='cards'
                                        data-card-number={index + 1}
                                        key={char.id}
                                        onClick={(e) => handleOnClick(e)}
                                    >
                                        <CardItem data={char}/>
                                    </li>
                                )
                            ) }
                            <ScrollToTop />
                            { isVisible && <ShowModal data={ data[selectedNumber] } isDisplay={ setIsVisible }/> }
                        </ul>
                        <Pagination
                            nextPage={nextPageUrl ? nextPage : null}
                            prevPage={prevPageUrl ? prevPage : null}
                            goToPage={goToPage}
                            pages={pages}
                        />
                    </>
                    ) }
            </>
        );
    }
}

export default Cards;